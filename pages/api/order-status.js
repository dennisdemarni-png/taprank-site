import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

const TRACKABLE_PRODUCTS = new Set(["google", "instagram", "tripadvisor", "custom"]);

function commerceSummary(snapshot) {
  if (!Array.isArray(snapshot)) return { itemCount: 1, productIds: [] };
  const productIds = [];
  let itemCount = 0;
  for (const item of snapshot) {
    const productId = String(item?.productId || "");
    const quantity = Number(item?.quantity);
    if (TRACKABLE_PRODUCTS.has(productId) && !productIds.includes(productId)) productIds.push(productId);
    if (Number.isInteger(quantity) && quantity > 0 && quantity <= 100) itemCount += quantity;
  }
  return { itemCount: Math.min(100, Math.max(1, itemCount)), productIds };
}

export default async function orderStatusHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ ok: false });
    return;
  }
  const reference = String(request.query.reference || "").toUpperCase();
  if (!/^TR-[A-F0-9]{24}$/.test(reference)) {
    response.status(400).json({ ok: false });
    return;
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    response.status(503).json({ ok: false });
    return;
  }
  const { data, error } = await supabase
    .from("storefront_orders")
    .select("order_reference,status,total_pence,created_at,paid_at,cart_snapshot")
    .eq("order_reference", reference)
    .maybeSingle();
  if (error) {
    console.error("Order status lookup failed.", error);
    response.status(503).json({ ok: false });
    return;
  }
  if (!data) {
    response.status(404).json({ ok: false });
    return;
  }
  response.status(200).json({
    ok: true,
    order: {
      reference: data.order_reference,
      status: data.status,
      totalPence: data.total_pence,
      commerce: commerceSummary(data.cart_snapshot),
      createdAt: data.created_at,
      paidAt: data.paid_at,
    },
  });
}
