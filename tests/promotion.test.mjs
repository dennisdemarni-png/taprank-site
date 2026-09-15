import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../lib/promotion.js', import.meta.url), 'utf8');
const hookSource = readFileSync(new URL('../components/product/usePromotionCountdown.js', import.meta.url), 'utf8');
const barSource = readFileSync(new URL('../components/product/PromotionBar.jsx', import.meta.url), 'utf8');
const landingSource = readFileSync(new URL('../components/product/ProductLanding.jsx', import.meta.url), 'utf8');
const landingStyles = readFileSync(new URL('../components/product/ProductLanding.module.css', import.meta.url), 'utf8');
const { PRODUCT_PROMOTION, promotionState, validRegularPricePence } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('promotion countdown uses a fixed future deadline and never resets', () => {
  const promotion = { enabled: true, endAt: '2030-01-03T12:30:00.000Z', regularPricePence: null };
  const running = promotionState(new Date('2030-01-01T10:00:00.000Z'), promotion);
  assert.deepEqual({ active: running.active, days: running.days, hours: running.hours, minutes: running.minutes, seconds: running.seconds }, { active: true, days: 2, hours: 2, minutes: 30, seconds: 0 });
  assert.equal(promotionState(new Date('2030-01-03T12:29:58.250Z'), promotion).seconds, 1);
  assert.equal(promotionState(new Date('2030-01-03T12:31:00.000Z'), promotion).active, false);
});

test('promotion displays a live seconds countdown in the banner and beside the regular price', () => {
  assert.match(hookSource, /setInterval\(update, 1000\)/);
  assert.doesNotMatch(hookSource, /30000/);
  assert.match(barSource, /state\.seconds/);
  assert.match(landingSource, /priceCountdown/);
  assert.match(landingSource, /promotion\.seconds/);
  assert.match(landingStyles, /\.price del \{ color: #c62828/);
  assert.match(landingStyles, /\.price \.priceCountdown/);
});

test('promotion stays inactive without a genuine configured deadline', () => {
  assert.equal(promotionState(new Date(), { enabled: true, endAt: null }).active, false);
  assert.equal(promotionState(new Date(), { enabled: false, endAt: '2030-01-01T00:00:00Z' }).active, false);
});

test('the approved Autumn Sale has a fixed deadline and genuine reference price', () => {
  assert.equal(PRODUCT_PROMOTION.enabled, true);
  assert.equal(PRODUCT_PROMOTION.endAt, '2026-11-30T23:59:59+00:00');
  assert.equal(PRODUCT_PROMOTION.regularPricePence, 7999);
  assert.equal(PRODUCT_PROMOTION.saleLabel, 'AUTUMN SALE — SAVE £15');
});

test('crossed-out pricing appears only when a higher regular price is configured', () => {
  assert.equal(validRegularPricePence(6499, { regularPricePence: 7999 }), 7999);
  assert.equal(validRegularPricePence(6499, { regularPricePence: 6499 }), null);
  assert.equal(validRegularPricePence(6499, { regularPricePence: null }), null);
});
