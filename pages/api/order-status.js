import { getSupabaseAdmin } from "../../lib/supabaseAdmin";

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
    .select("order_reference,status,total_pence,created_at,paid_at")
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
      createdAt: data.created_at,
      paidAt: data.paid_at,
    },
  });
}
