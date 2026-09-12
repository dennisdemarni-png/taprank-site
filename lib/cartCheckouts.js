import { getSupabaseAdmin } from "./supabaseAdmin";
import { cancelSquarePaymentLink } from "./squareServer";

export async function openCheckoutsForCart(cartId) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Storefront database is not configured.");
  const { data, error } = await supabase
    .from("storefront_orders")
    .select("id,status,total_pence,cart_snapshot,square_payment_link_id,square_checkout_url,created_at")
    .eq("cart_id", cartId)
    .eq("status", "checkout_created")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function invalidateOpenCheckoutsForCart(cartId, checkouts) {
  const orders = checkouts || await openCheckoutsForCart(cartId);
  if (!orders.length) return;

  for (const order of orders) {
    if (order.square_payment_link_id) await cancelSquarePaymentLink(order.square_payment_link_id);
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("storefront_orders")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .in("id", orders.map((order) => order.id))
    .eq("status", "checkout_created");
  if (error) throw error;
}
