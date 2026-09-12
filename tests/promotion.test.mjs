import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../lib/promotion.js', import.meta.url), 'utf8');
const { PRODUCT_PROMOTION, promotionState, validRegularPricePence } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('promotion countdown uses a fixed future deadline and never resets', () => {
  const promotion = { enabled: true, endAt: '2030-01-03T12:30:00.000Z', regularPricePence: null };
  const running = promotionState(new Date('2030-01-01T10:00:00.000Z'), promotion);
  assert.deepEqual({ active: running.active, days: running.days, hours: running.hours, minutes: running.minutes }, { active: true, days: 2, hours: 2, minutes: 30 });
  assert.equal(promotionState(new Date('2030-01-03T12:31:00.000Z'), promotion).active, false);
});

test('promotion stays inactive without a genuine configured deadline', () => {
  assert.equal(promotionState(new Date(), { enabled: true, endAt: null }).active, false);
  assert.equal(promotionState(new Date(), { enabled: false, endAt: '2030-01-01T00:00:00Z' }).active, false);
});

test('the approved five-day campaign has a fixed deadline and genuine reference price', () => {
  assert.equal(PRODUCT_PROMOTION.enabled, true);
  assert.equal(PRODUCT_PROMOTION.endAt, '2026-09-17T14:30:00+01:00');
  assert.equal(PRODUCT_PROMOTION.regularPricePence, 7999);
  assert.equal(PRODUCT_PROMOTION.saleLabel, '5-DAY OFFER — SAVE £15');
});

test('crossed-out pricing appears only when a higher regular price is configured', () => {
  assert.equal(validRegularPricePence(6499, { regularPricePence: 7999 }), 7999);
  assert.equal(validRegularPricePence(6499, { regularPricePence: 6499 }), null);
  assert.equal(validRegularPricePence(6499, { regularPricePence: null }), null);
});
