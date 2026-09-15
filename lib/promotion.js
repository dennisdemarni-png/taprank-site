// Autumn Sale approved by TapRank on 14 September 2026. The fixed deadline
// keeps the sale active through 30 November and never resets for returning visitors.
export const PRODUCT_PROMOTION = Object.freeze({
  id: "autumn-standard-stand-sale-2026",
  enabled: true,
  endAt: "2026-11-30T23:59:59+00:00",
  banner: "AUTUMN SALE — STANDARD STANDS £64.99 — ENDS 30 NOVEMBER",
  saleLabel: "AUTUMN SALE — SAVE £15",
  regularPricePence: 7999,
});

export function promotionState(now = Date.now(), promotion = PRODUCT_PROMOTION) {
  const endTime = Date.parse(promotion?.endAt || "");
  const validDeadline = Number.isFinite(endTime);
  const active = promotion?.enabled === true && validDeadline && endTime > now;
  const remainingMilliseconds = active ? endTime - now : 0;
  const totalSeconds = Math.max(0, Math.floor(remainingMilliseconds / 1000));
  return {
    active,
    endTime: validDeadline ? endTime : null,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds % 86400 / 3600),
    minutes: Math.floor(totalSeconds % 3600 / 60),
    seconds: totalSeconds % 60,
  };
}

export function validRegularPricePence(salePricePence, promotion = PRODUCT_PROMOTION) {
  const regular = Number(promotion?.regularPricePence);
  return Number.isInteger(regular) && regular > salePricePence ? regular : null;
}
