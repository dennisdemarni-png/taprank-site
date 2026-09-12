import { createHmac, timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

export const config = { api: { bodyParser: false } };

function readRawBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1024 * 1024) {
        reject(new Error("Webhook body is too large."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function isValidSquareSignature(body, signature) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL;
  if (!signatureKey || !notificationUrl || !signature) return false;
  const expected = createHmac("sha256", signatureKey).update(notificationUrl + body).digest();
  let received;
  try {
    received = Buffer.from(signature, "base64");
  } catch {
    return false;
  }
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export default async function squareWebhookHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).end();
    return;
  }

  let body;
  try {
    body = await readRawBody(request);
  } catch {
    response.status(413).end();
    return;
  }
  if (!isValidSquareSignature(body, request.headers["x-square-hmacsha256-signature"])) {
    response.status(403).end();
    return;
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    response.status(400).end();
    return;
  }

  const eventId = String(event.event_id || "");
  const eventType = String(event.type || "unknown");
  if (!eventId || eventId.length > 200) {
    response.status(400).end();
    return;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    response.status(503).end();
    return;
  }

  const payment = event.data?.object?.payment;
  const order = event.data?.object?.order;
  const squareOrderId = payment?.order_id || order?.id || null;
  const squareObjectId = payment?.id || order?.id || null;

  const { data: priorEvent } = await supabase
    .from("square_webhook_events")
    .select("processed_at")
    .eq("event_id", eventId)
    .maybeSingle();
  if (priorEvent?.processed_at) {
    response.status(200).json({ received: true });
    return;
  }
  if (!priorEvent) {
    const { error: eventError } = await supabase.from("square_webhook_events").insert({
      event_id: eventId,
      event_type: eventType,
      square_object_id: squareObjectId,
    });
    if (eventError && eventError.code !== "23505") {
      console.error("Square webhook event insert failed.", eventError);
      response.status(503).end();
      return;
    }
  }

  try {
    if (squareOrderId && payment?.status === "COMPLETED") {
      const now = new Date().toISOString();
      const { data: matchedOrder, error: orderError } = await supabase
        .from("storefront_orders")
        .update({ status: "paid", paid_at: now, updated_at: now })
        .eq("square_order_id", squareOrderId)
        .in("status", ["checkout_created", "paid"])
        .select("cart_id")
        .maybeSingle();
      if (orderError) throw orderError;
      if (matchedOrder?.cart_id) {
        await supabase.from("storefront_carts").update({ status: "converted", updated_at: now }).eq("id", matchedOrder.cart_id);
      }
    }

    await supabase
      .from("square_webhook_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("event_id", eventId);
    response.status(200).json({ received: true });
  } catch (error) {
    console.error("Square webhook processing failed.", error);
    response.status(503).end();
  }
}
