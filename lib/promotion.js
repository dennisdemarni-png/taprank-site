// Public merchandising configuration. Only activate a campaign after TapRank
// has supplied a genuine deadline. This file deliberately ships inactive.
export const PRODUCT_PROMOTION = Object.freeze({
  id: "standard-stand-offer",
  enabled: false,
  endAt: null,
  banner: "LIMITED-TIME TAPRANK OFFER — STANDARD STANDS £64.99",
  saleLabel: "LIMITED-TIME OFFER",
  regularPricePence: null,
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
