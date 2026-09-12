const SQUARE_BASE_URLS = Object.freeze({
  sandbox: "https://connect.squareupsandbox.com",
  production: "https://connect.squareup.com",
});

export function getSquareConfiguration() {
  const environment = process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox";
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

  if (!accessToken || !locationId) return null;
  return { environment, accessToken, locationId, baseUrl: SQUARE_BASE_URLS[environment] };
}

export async function createSquarePaymentLink({ idempotencyKey, reference, items, redirectUrl }) {
  const config = getSquareConfiguration();
  if (!config) throw new Error("Square checkout is not configured.");

  const headers = {
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };
  if (process.env.SQUARE_API_VERSION) headers["Square-Version"] = process.env.SQUARE_API_VERSION;

  const response = await fetch(`${config.baseUrl}/v2/online-checkout/payment-links`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      idempotency_key: idempotencyKey,
      description: `TapRank order ${reference}`,
      order: {
        location_id: config.locationId,
        reference_id: reference,
        line_items: items.map((item) => ({
          name: item.product_name,
          quantity: String(item.quantity),
          base_price_money: {
            amount: item.unit_price_pence,
            currency: "GBP",
          },
        })),
      },
      checkout_options: {
        ask_for_shipping_address: true,
        redirect_url: redirectUrl,
      },
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.payment_link?.url || !result.payment_link?.order_id) {
    const detail = result.errors?.map((error) => error.detail).filter(Boolean).join("; ");
    throw new Error(detail || "Square could not create a checkout link.");
  }

  return {
    checkoutUrl: result.payment_link.url,
    paymentLinkId: result.payment_link.id,
    squareOrderId: result.payment_link.order_id,
  };
}
