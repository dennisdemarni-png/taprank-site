import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const commerce = readFileSync(new URL('../lib/commerce.js', import.meta.url), 'utf8');
const storefront = readFileSync(new URL('../lib/storefront.js', import.meta.url), 'utf8')
  .replace('import { productFor } from "./commerce";', '');
const moduleSource = `${commerce}\n${storefront}`;
const { googleReviewUrl, validateProductConfiguration } = await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString('base64')}`);

const validGoogle = {
  productId: 'google',
  quantity: 1,
  businessName: 'TapRank Test Business',
  placeId: 'ChIJ_TEST_123',
  additionalLinks: [],
  privacyAccepted: true,
};

test('Google place selection produces the required review action without trusting a browser price', () => {
  const result = validateProductConfiguration({ ...validGoogle, unitPricePence: 1, primaryAction: 'instagram' });
  assert.equal(result.isValid, true);
  assert.equal(result.values.unitPricePence, 6499);
  assert.equal(result.values.configuration.primaryAction, 'google');
  assert.equal(result.values.configuration.primaryUrl, googleReviewUrl(validGoogle.placeId));
});

test('custom configuration requires a supported primary action and keeps its trusted price', () => {
  const missing = validateProductConfiguration({ productId: 'custom', quantity: 1, businessName: 'Test', privacyAccepted: true });
  assert.equal(missing.isValid, false);
  assert.ok(missing.errors.primaryAction);
  const valid = validateProductConfiguration({ productId: 'custom', quantity: 2, businessName: 'Test', primaryAction: 'instagram', primaryUrl: 'https://instagram.com/test', privacyAccepted: true });
  assert.equal(valid.isValid, true);
  assert.equal(valid.values.unitPricePence, 8499);
});

test('unsafe links, excessive quantities and missing privacy confirmation fail validation', () => {
  const result = validateProductConfiguration({ ...validGoogle, quantity: 21, placeId: '', primaryUrl: 'http://example.com', privacyAccepted: false, additionalLinks: [{ label: 'Menu', url: 'javascript:alert(1)' }] });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.quantity);
  assert.ok(result.errors.primaryUrl);
  assert.ok(result.errors.privacyAccepted);
  assert.ok(result.errors['additionalLinks.0.url']);
});

test('only five additional links are retained', () => {
  const additionalLinks = Array.from({ length: 7 }, (_, index) => ({ label: `Link ${index}`, url: `https://example.com/${index}` }));
  const result = validateProductConfiguration({ ...validGoogle, additionalLinks });
  assert.equal(result.isValid, true);
  assert.equal(result.values.configuration.additionalLinks.length, 5);
});

test('Square webhook endpoint requires raw body verification and never contains a hardcoded secret', () => {
  const source = readFileSync(new URL('../pages/api/square/webhook.js', import.meta.url), 'utf8');
  assert.match(source, /bodyParser:\s*false/);
  assert.match(source, /timingSafeEqual/);
  assert.match(source, /SQUARE_WEBHOOK_SIGNATURE_KEY/);
  assert.doesNotMatch(source, /sandbox-sq0/);
});
