import { createHmac, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import formidable from "formidable";
import {
  ORDER_DETAILS_LOGO_MAX_BYTES,
  ORDER_DETAILS_LOGO_TYPES,
  ORDER_DETAILS_PRIVACY_VERSION,
  validateOrderDetails,
} from "../../lib/orderDetails";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

const LOGO_EXTENSIONS = Object.freeze({
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
});

function parseForm(request) {
  const form = formidable({
    allowEmptyFiles: false,
    maxFields: 40,
    maxFieldsSize: 64 * 1024,
    maxFileSize: ORDER_DETAILS_LOGO_MAX_BYTES,
    maxFiles: 1,
    multiples: false,
  });

  return new Promise((resolve, reject) => {
    form.parse(request, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ fields, files });
    });
  });
}

function firstFile(value) {
  return Array.isArray(value) ? value[0] : value;
}

function getRequestAddress(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.socket?.remoteAddress || "unknown";
}

function getRequestHash(request, secret) {
  const address = getRequestAddress(request);
  const userAgent = request.headers["user-agent"] || "unknown";

  return createHmac("sha256", secret)
    .update(`${address}|${userAgent}`)
    .digest("hex");
}

function makeSubmissionReference(id) {
  return `TR-${id.replaceAll("-", "").slice(0, 10).toUpperCase()}`;
}

function hasExpectedImageSignature(bytes, mimeType) {
  if (mimeType === "image/png") {
    return (
      bytes.length >= 8 &&
      bytes.subarray(0, 8).equals(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      )
    );
  }

  if (mimeType === "image/jpeg") {
    return (
      bytes.length >= 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff
    );
  }

  if (mimeType === "image/webp") {
    return (
      bytes.length >= 12 &&
      bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
      bytes.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
}

function sendError(response, status, message, errors) {
  response.status(status).json({
    ok: false,
    message,
    ...(errors ? { errors } : {}),
  });
}

export default async function orderDetailsHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendError(response, 405, "This endpoint accepts order-detail submissions only.");
    return;
  }

  if (!request.headers["content-type"]?.includes("multipart/form-data")) {
    sendError(response, 415, "Submit the order details using the secure form.");
    return;
  }

  const supabase = getSupabaseAdmin();
  const rateLimitSecret = process.env.ORDER_DETAILS_RATE_LIMIT_SECRET;

  if (!supabase || !rateLimitSecret || rateLimitSecret.length < 32) {
    console.error("Order-details submission is missing required server configuration.");
    sendError(
      response,
      503,
      "Online submission is temporarily unavailable. Please contact TapRank for help."
    );
    return;
  }

  let parsedForm;

  try {
    parsedForm = await parseForm(request);
  } catch (error) {
    console.error("Order-details multipart parsing failed.", error);
    sendError(
      response,
      400,
      "Your form or logo could not be processed. Use a JPG, PNG or WebP logo under 3 MB."
    );
    return;
  }

  const { errors, isValid, values } = validateOrderDetails(parsedForm.fields);

  if (values.companyWebsite) {
    response.status(200).json({
      ok: true,
      message: "Your setup details have been received.",
      reference: "TR-RECEIVED",
    });
    return;
  }

  const formAge = Date.now() - values.startedAt;
  if (
    !Number.isFinite(values.startedAt) ||
    formAge < 2000 ||
    formAge > 24 * 60 * 60 * 1000
  ) {
    sendError(response, 400, "Please refresh the form and try again.");
    return;
  }

  if (!isValid) {
    sendError(
      response,
      400,
      "Please check the highlighted details and submit again.",
      errors
    );
    return;
  }

  const logo = firstFile(parsedForm.files.logo);
  if (
    logo &&
    (!ORDER_DETAILS_LOGO_TYPES.includes(logo.mimetype) ||
      logo.size > ORDER_DETAILS_LOGO_MAX_BYTES)
  ) {
    sendError(
      response,
      400,
      "Use a JPG, PNG or WebP logo no larger than 3 MB.",
      { logo: "Choose a supported logo file under 3 MB." }
    );
    return;
  }

  const requestHash = getRequestHash(request, rateLimitSecret);
  const { data: slotAvailable, error: rateLimitError } = await supabase.rpc(
    "claim_order_submission_slot",
    { p_request_hash: requestHash }
  );

  if (rateLimitError) {
    console.error("Order-details rate-limit check failed.", rateLimitError);
    sendError(
      response,
      503,
      "Online submission is temporarily unavailable. Please contact TapRank for help."
    );
    return;
  }

  if (!slotAvailable) {
    sendError(
      response,
      429,
      "Too many submissions were received. Please wait an hour or contact TapRank."
    );
    return;
  }

  const submissionId = randomUUID();
  const submissionReference = makeSubmissionReference(submissionId);
  let logoPath = null;

  if (logo) {
    const extension = LOGO_EXTENSIONS[logo.mimetype];
    logoPath = `${submissionId}/${randomUUID()}.${extension}`;

    try {
      const logoBytes = await readFile(logo.filepath);
      if (!hasExpectedImageSignature(logoBytes, logo.mimetype)) {
        sendError(
          response,
          400,
          "The selected logo is not a valid JPG, PNG or WebP image.",
          { logo: "Choose a valid JPG, PNG or WebP image under 3 MB." }
        );
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from("order-branding")
        .upload(logoPath, logoBytes, {
          cacheControl: "3600",
          contentType: logo.mimetype,
          upsert: false,
        });

      if (uploadError) throw uploadError;
    } catch (error) {
      console.error("Order branding upload failed.", error);
      sendError(
        response,
        503,
        "Your logo could not be stored. Please try again or submit without it."
      );
      return;
    }
  }

  const additionalLinks =
    values.additionalLinkLabel && values.additionalLinkUrl
      ? [
          {
            label: values.additionalLinkLabel,
            url: values.additionalLinkUrl,
          },
        ]
      : [];

  const now = new Date().toISOString();
  const { error: insertError } = await supabase
    .from("order_detail_submissions")
    .insert({
      id: submissionId,
      submission_reference: submissionReference,
      square_order_reference: values.squareOrderReference || null,
      product_type: values.productType,
      quantity: values.quantity,
      contact_name: values.contactName,
      contact_email: values.contactEmail,
      contact_phone: values.contactPhone,
      business_name: values.businessName,
      business_type: values.businessType,
      business_address: values.businessAddress || null,
      public_phone: values.publicPhone || null,
      public_email: values.publicEmail || null,
      opening_hours: values.openingHours || null,
      primary_action: values.primaryAction,
      primary_action_url: values.primaryActionUrl,
      website_url: values.websiteUrl || null,
      booking_url: values.bookingUrl || null,
      menu_url: values.menuUrl || null,
      instagram_url: values.instagramUrl || null,
      facebook_url: values.facebookUrl || null,
      tiktok_url: values.tiktokUrl || null,
      whatsapp_number: values.whatsappNumber || null,
      additional_links: additionalLinks,
      brand_colours: values.brandColours || null,
      branding_notes: values.brandingNotes || null,
      logo_path: logoPath,
      payment_status: "unverified",
      privacy_notice_version: ORDER_DETAILS_PRIVACY_VERSION,
      privacy_acknowledged_at: now,
      accuracy_confirmed_at: now,
    });

  if (insertError) {
    console.error("Order-details insert failed.", insertError);

    if (logoPath) {
      await supabase.storage.from("order-branding").remove([logoPath]);
    }

    sendError(
      response,
      503,
      "Your details could not be saved. Please try again or contact TapRank."
    );
    return;
  }

  response.status(201).json({
    ok: true,
    message: "Your setup details have been received.",
    reference: submissionReference,
  });
}
