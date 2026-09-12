import { randomUUID } from "node:crypto";
import { cartTokenFromRequest, findCart, makeOrderReference } from "../../lib/cartServer";
import { getSupabaseAdmin } from "../../lib/supabaseAdmin";
import { createSquarePaymentLink } from "../../lib/squareServer";
import { linePricingFor } from "../../lib/commerce";
import { validateProductConfiguration } from "../../lib/storefront";
import { checkoutSiteUrl } from "../../lib/checkoutOrigin";

function sendError(response, status, message) {
  response.status(status).json({ ok: false, message });
}

export default async function checkoutHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendError(response, 405, "This endpoint starts TapRank checkout only.");
    return;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    sendError(response, 503, "Checkout is temporarily unavailable. Please use the secure Square fallback link.");
    return;
  }

  try {
    const cart = await findCart(cartTokenFromRequest(request));
    if (!cart) {
      sendError(response, 400, "Your cart is empty or has expired.");
      return;
    }

    const { data: existingOrder, error: existingError } = await supabase
      .from("storefront_orders")
      .select("order_reference,square_checkout_url")
      .eq("cart_id", cart.id)
      .eq("status", "checkout_created")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existingError) throw existingError;
    if (existingOrder?.square_checkout_url) {
      response.status(200).json({ ok: true, checkoutUrl: existingOrder.square_checkout_url, reference: existingOrder.order_reference });
      return;
    }

    const { data: items, error: itemsError } = await supabase
      .from("storefront_cart_items")
      .select("id,product_id,product_name,unit_price_pence,quantity,configuration,logo_path")
      .eq("cart_id", cart.id)
      .order("created_at", { ascending: true });
    if (itemsError) throw itemsError;
    if (!items?.length) {
      sendError(response, 400, "Add a configured TapRank before checking out.");
      return;
    }

    for (const item of items) {
      const validation = validateProductConfiguration({
        productId: item.product_id,
        quantity: item.quantity,
        ...item.configuration,
        primaryUrl: item.configuration.primaryUrl,
      });
      if (!validation.isValid || validation.values.unitPricePence !== item.unit_price_pence) {
        sendError(response, 400, "A cart item is no longer valid. Remove it and configure the product again.");
        return;
      }
      if (item.product_id === "custom" && !item.logo_path) {
        sendError(response, 400, "The Custom TapRank in your cart needs a logo.");
        return;
      }
    }

    const pricedItems = items.map((item) => ({ ...item, pricing: linePricingFor(item.product_id, item.quantity) }));
    if (pricedItems.some((item) => !item.pricing)) {
      sendError(response, 400, "A cart bundle is no longer available. Remove it and choose a current bundle.");
      return;
    }
    const totalPence = pricedItems.reduce((total, item) => total + item.pricing.totalPence, 0);
    const orderId = randomUUID();
    const orderReference = makeOrderReference();
    const snapshot = pricedItems.map((item) => ({
      productId: item.product_id,
      productName: item.product_name,
      unitPricePence: item.unit_price_pence,
      quantity: item.quantity,
      pricing: item.pricing,
      configuration: item.configuration,
      logoPath: item.logo_path,
    }));

    const { error: insertError } = await supabase.from("storefront_orders").insert({
      id: orderId,
      order_reference: orderReference,
      cart_id: cart.id,
      status: "checkout_pending",
      total_pence: totalPence,
      cart_snapshot: snapshot,
    });
    if (insertError) throw insertError;

    const siteUrl = checkoutSiteUrl(request);
    let squareCheckout;
    try {
      squareCheckout = await createSquarePaymentLink({
        idempotencyKey: orderId,
        reference: orderReference,
        items: pricedItems,
        redirectUrl: `${siteUrl}/order-confirmation?reference=${encodeURIComponent(orderReference)}`,
      });
    } catch (error) {
      await supabase.from("storefront_orders").update({ status: "failed", updated_at: new Date().toISOString() }).eq("id", orderId);
      throw error;
    }

    const { error: updateError } = await supabase
      .from("storefront_orders")
      .update({
        status: "checkout_created",
        square_order_id: squareCheckout.squareOrderId,
        square_payment_link_id: squareCheckout.paymentLinkId,
        square_checkout_url: squareCheckout.checkoutUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);
    if (updateError) throw updateError;

    await supabase.from("storefront_carts").update({ status: "checkout_started", updated_at: new Date().toISOString() }).eq("id", cart.id);
    response.status(201).json({ ok: true, checkoutUrl: squareCheckout.checkoutUrl, reference: orderReference });
  } catch (error) {
    console.error("Square checkout creation failed.", error);
    sendError(response, 503, "Secure checkout could not be started. Please try again or use the Square fallback link.");
  }
}
