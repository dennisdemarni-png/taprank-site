import { createHash, randomBytes, randomUUID } from "node:crypto";
import { getSupabaseAdmin } from "./supabaseAdmin";
import {
  STOREFRONT_CART_COOKIE,
  STOREFRONT_CART_MAX_AGE_SECONDS,
  sanitiseCartForBrowser,
} from "./storefront";
import { EDITABLE_CART_STATUSES } from "./cartLifecycle";

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        if (separator < 0) return [part, ""];
        return [part.slice(0, separator), decodeURIComponent(part.slice(separator + 1))];
      })
  );
}

export function cartTokenFromRequest(request) {
  const token = parseCookies(request.headers.cookie)[STOREFRONT_CART_COOKIE] || "";
  return /^[A-Za-z0-9_-]{32,160}$/.test(token) ? token : "";
}

export function newCartToken() {
  return randomBytes(32).toString("base64url");
}

export function hashCartToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function setCartCookie(response, token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `${STOREFRONT_CART_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${STOREFRONT_CART_MAX_AGE_SECONDS}${secure}`
  );
}

export async function findCart(token, statuses = EDITABLE_CART_STATUSES) {
  if (!token) return null;
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Storefront database is not configured.");

  const { data, error } = await supabase
    .from("storefront_carts")
    .select("id,status,expires_at")
    .eq("token_hash", hashCartToken(token))
    .in("status", statuses)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function findActiveCart(token) {
  return findCart(token, EDITABLE_CART_STATUSES);
}

export async function ensureActiveCart(request, response) {
  let token = cartTokenFromRequest(request);
  let cart = await findActiveCart(token);
  if (cart) return { cart, token };

  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Storefront database is not configured.");
  token = newCartToken();
  const expiresAt = new Date(Date.now() + STOREFRONT_CART_MAX_AGE_SECONDS * 1000).toISOString();
  const { data, error } = await supabase
    .from("storefront_carts")
    .insert({
      id: randomUUID(),
      token_hash: hashCartToken(token),
      status: "active",
      expires_at: expiresAt,
    })
    .select("id,status,expires_at")
    .single();

  if (error) throw error;
  setCartCookie(response, token);
  return { cart: data, token };
}

export async function cartWithItems(token) {
  const cart = await findCart(token);
  if (!cart) return sanitiseCartForBrowser(null, []);

  const supabase = getSupabaseAdmin();
  const { data: items, error } = await supabase
    .from("storefront_cart_items")
    .select("id,product_id,product_name,unit_price_pence,quantity,configuration,logo_path,created_at")
    .eq("cart_id", cart.id)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return sanitiseCartForBrowser(cart, items || []);
}

export function makeOrderReference() {
  return `TR-${randomUUID().replaceAll("-", "").slice(0, 24).toUpperCase()}`;
}
