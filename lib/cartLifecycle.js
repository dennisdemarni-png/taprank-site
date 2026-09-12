export const EDITABLE_CART_STATUSES = Object.freeze(["active", "checkout_started"]);

export function isEditableCartStatus(status) {
  return EDITABLE_CART_STATUSES.includes(status);
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

export function stableSnapshot(snapshot) {
  return JSON.stringify(stableValue(snapshot));
}

export function checkoutMatchesCart(order, snapshot, totalPence) {
  return order?.status === "checkout_created"
    && Boolean(order.square_checkout_url)
    && Number(order.total_pence) === Number(totalPence)
    && stableSnapshot(order.cart_snapshot) === stableSnapshot(snapshot);
}

export function checkoutSnapshot(items) {
  return items.map((item) => ({
    productId: item.product_id,
    productName: item.product_name,
    unitPricePence: item.unit_price_pence,
    quantity: item.quantity,
    pricing: item.pricing,
    configuration: item.configuration,
    logoPath: item.logo_path,
  }));
}

export function squareLineItems(items) {
  return items.map((item) => item.pricing.discountPercent > 0 ? ({
    name: `${item.product_name} — ${item.quantity}-stand bundle (${item.pricing.discountPercent}% off)`,
    quantity: "1",
    base_price_money: {
      amount: item.pricing.totalPence,
      currency: "GBP",
    },
  }) : ({
    name: item.product_name,
    quantity: String(item.quantity),
    base_price_money: {
      amount: item.unit_price_pence,
      currency: "GBP",
    },
  }));
}
