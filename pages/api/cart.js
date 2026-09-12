import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import formidable from "formidable";
import { cartTokenFromRequest, cartWithItems, ensureActiveCart, findActiveCart } from "../../lib/cartServer";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";
import { invalidateOpenCheckoutsForCart } from "../../lib/cartCheckouts";
import {
  STOREFRONT_LOGO_MAX_BYTES,
  STOREFRONT_LOGO_TYPES,
  sanitiseCartForBrowser,
  validateProductConfiguration,
} from "../../lib/storefront";

export const config = { api: { bodyParser: false } };

const LOGO_EXTENSIONS = Object.freeze({
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
});

function parseForm(request) {
  const form = formidable({
    allowEmptyFiles: false,
    maxFields: 20,
    maxFieldsSize: 48 * 1024,
    maxFileSize: STOREFRONT_LOGO_MAX_BYTES,
    maxFiles: 1,
    multiples: false,
  });
  return new Promise((resolve, reject) => {
    form.parse(request, (error, fields, files) => error ? reject(error) : resolve({ fields, files }));
  });
}

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function hasExpectedImageSignature(bytes, mimeType) {
  if (mimeType === "image/png") {
    return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (mimeType === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mimeType === "image/webp") {
    return bytes.length >= 12 && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  }
  return false;
}

function sendError(response, status, message, errors) {
  response.status(status).json({ ok: false, message, ...(errors ? { errors } : {}) });
}

async function handleGet(request, response) {
  const cart = await cartWithItems(cartTokenFromRequest(request));
  response.status(200).json({ ok: true, cart });
}

async function handlePost(request, response) {
  if (!request.headers["content-type"]?.includes("multipart/form-data")) {
    sendError(response, 415, "Add this product using the TapRank configuration form.");
    return;
  }

  let parsed;
  try {
    parsed = await parseForm(request);
  } catch (error) {
    console.error("Storefront cart form parsing failed.", error);
    sendError(response, 400, "The product configuration or logo could not be processed.");
    return;
  }

  let configuration;
  try {
    configuration = JSON.parse(String(first(parsed.fields.configuration) || "{}"));
  } catch {
    sendError(response, 400, "The product configuration is not valid.");
    return;
  }

  if (String(first(parsed.fields.productId) || "").toLowerCase() === "custom") {
    sendError(response, 404, "Custom TapRank stands are not currently available.");
    return;
  }

  const validation = validateProductConfiguration({
    ...configuration,
    productId: first(parsed.fields.productId),
    quantity: first(parsed.fields.quantity),
  });
  if (!validation.isValid) {
    sendError(response, 400, "Please check the highlighted product details.", validation.errors);
    return;
  }

  const logo = first(parsed.files.logo);
  if (validation.values.productId === "custom" && !logo) {
    sendError(response, 400, "Upload your business logo for the Custom TapRank.", { logo: "A logo is required for the Custom TapRank." });
    return;
  }
  if (logo && (validation.values.productId !== "custom" || !STOREFRONT_LOGO_TYPES.includes(logo.mimetype) || logo.size > STOREFRONT_LOGO_MAX_BYTES)) {
    sendError(response, 400, "Use a JPG, PNG or WebP logo no larger than 3 MB.", { logo: "Choose a supported logo file under 3 MB." });
    return;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    sendError(response, 503, "The TapRank cart is temporarily unavailable. Please use the secure Square checkout link below.");
    return;
  }

  let cart;
  try {
    ({ cart } = await ensureActiveCart(request, response));
  } catch (error) {
    console.error("Storefront cart creation failed.", error);
    sendError(response, 503, "The TapRank cart is not ready yet. Please use the secure Square checkout link below.");
    return;
  }

  try {
    await invalidateOpenCheckoutsForCart(cart.id);
  } catch (error) {
    console.error("Previous storefront checkout invalidation failed.", error);
    sendError(response, 503, "Your previous checkout could not be refreshed safely. Please try again before adding this item.");
    return;
  }

  const itemId = randomUUID();
  let logoPath = null;
  if (logo) {
    try {
      const bytes = await readFile(logo.filepath);
      if (!hasExpectedImageSignature(bytes, logo.mimetype)) {
        sendError(response, 400, "The uploaded logo is not a valid image.", { logo: "Choose a valid JPG, PNG or WebP image." });
        return;
      }
      logoPath = `${cart.id}/${itemId}.${LOGO_EXTENSIONS[logo.mimetype]}`;
      const { error } = await supabase.storage.from("storefront-branding").upload(logoPath, bytes, {
        cacheControl: "3600",
        contentType: logo.mimetype,
        upsert: false,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Storefront logo upload failed.", error);
      sendError(response, 503, "Your logo could not be stored. Please try again.");
      return;
    }
  }

  const values = validation.values;
  const { error: insertError } = await supabase.from("storefront_cart_items").insert({
    id: itemId,
    cart_id: cart.id,
    product_id: values.productId,
    product_name: values.productName,
    unit_price_pence: values.unitPricePence,
    quantity: values.quantity,
    configuration: values.configuration,
    logo_path: logoPath,
  });

  if (insertError) {
    console.error("Storefront cart item insert failed.", insertError);
    if (logoPath) await supabase.storage.from("storefront-branding").remove([logoPath]);
    sendError(response, 503, "This product could not be added to your cart. Please try again.");
    return;
  }

  const browserCart = await cartWithItems(cartTokenFromRequest(request) || undefined).catch(() => null);
  // The first request receives its cookie only in the response, so load by cart id when needed.
  if (!browserCart?.id) {
    const { data: items } = await supabase
      .from("storefront_cart_items")
      .select("id,product_id,product_name,unit_price_pence,quantity,configuration,logo_path,created_at")
      .eq("cart_id", cart.id)
      .order("created_at", { ascending: true });
    response.status(201).json({ ok: true, cart: sanitiseCartForBrowser(cart, items || []) });
    return;
  }
  response.status(201).json({ ok: true, cart: browserCart });
}

async function handleDelete(request, response) {
  const itemId = String(request.query.itemId || "");
  if (!/^[0-9a-f-]{36}$/i.test(itemId)) {
    sendError(response, 400, "Choose a valid cart item to remove.");
    return;
  }
  const token = cartTokenFromRequest(request);
  const cart = await findActiveCart(token);
  if (!cart) {
    response.status(200).json({ ok: true, cart: await cartWithItems("") });
    return;
  }
  const supabase = getSupabaseAdmin();
  const { data: item, error: findError } = await supabase
    .from("storefront_cart_items")
    .select("id,logo_path")
    .eq("id", itemId)
    .eq("cart_id", cart.id)
    .maybeSingle();
  if (findError) throw findError;
  if (item) {
    try {
      await invalidateOpenCheckoutsForCart(cart.id);
    } catch (error) {
      console.error("Previous storefront checkout invalidation failed.", error);
      sendError(response, 503, "Your previous checkout could not be refreshed safely. Please try again before removing this item.");
      return;
    }
    const { error } = await supabase.from("storefront_cart_items").delete().eq("id", item.id).eq("cart_id", cart.id);
    if (error) throw error;
    if (item.logo_path) await supabase.storage.from("storefront-branding").remove([item.logo_path]);
  }
  response.status(200).json({ ok: true, cart: await cartWithItems(token) });
}

export default async function cartHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  try {
    if (request.method === "GET") return await handleGet(request, response);
    if (request.method === "POST") return await handlePost(request, response);
    if (request.method === "DELETE") return await handleDelete(request, response);
  } catch (error) {
    console.error("Storefront cart request failed.", error);
    sendError(response, 503, "The TapRank cart is temporarily unavailable. Please try again.");
    return;
  }
  response.setHeader("Allow", "GET, POST, DELETE");
  sendError(response, 405, "This cart action is not supported.");
}
