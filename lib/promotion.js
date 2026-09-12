// Five-day offer approved by TapRank on 12 September 2026. The fixed deadline
// never rolls forward or resets for returning visitors.
export const PRODUCT_PROMOTION = Object.freeze({
  id: "five-day-standard-stand-offer-2026-09",
  enabled: true,
  endAt: "2026-09-17T14:30:00+01:00",
  banner: "5-DAY TAPRANK OFFER — STANDARD STANDS £64.99",
  saleLabel: "5-DAY OFFER — SAVE £15",
  regularPricePence: 7999,
});

export function promotionState(now = Date.now(), promotion = PRODUCT_PROMOTION) {
  const endTime = Date.parse(promotion?.endAt || "");
  const validDeadline = Number.isFinite(endTime);
  const active = promotion?.enabled === true && validDeadline && endTime > now;
  const remainingMilliseconds = active ? endTime - now : 0;
  const totalMinutes = Math.max(0, Math.floor(remainingMilliseconds / 60000));
  return {
    active,
    endTime: validDeadline ? endTime : null,
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor(totalMinutes % 1440 / 60),
    minutes: totalMinutes % 60,
  };
}

export function validRegularPricePence(salePricePence, promotion = PRODUCT_PROMOTION) {
  const regular = Number(promotion?.regularPricePence);
  return Number.isInteger(regular) && regular > salePricePence ? regular : null;
}
