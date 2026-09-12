import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const commerce = readFileSync(new URL('../lib/commerce.js', import.meta.url), 'utf8');
const storefront = readFileSync(new URL('../lib/storefront.js', import.meta.url), 'utf8')
  .replace('import { linePricingFor, productFor } from "./commerce";', '');
const moduleSource = `${commerce}\n${storefront}`;
const { googleReviewUrl, linePricingFor, sanitiseCartForBrowser, validateProductConfiguration } = await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString('base64')}`);
const { checkoutSiteUrl } = await import('../lib/checkoutOrigin.js');

const validGoogle = {
  productId: 'google',
  quantity: 1,
  businessName: 'TapRank Test Business',
  placeId: 'ChIJ_TEST_123',
  additionalLinks: [],
};

test('Google place selection produces the required review action without trusting a browser price', () => {
  const result = validateProductConfiguration({ ...validGoogle, unitPricePence: 1, primaryAction: 'instagram' });
  assert.equal(result.isValid, true);
  assert.equal(result.values.unitPricePence, 6499);
  assert.equal(result.values.configuration.primaryAction, 'google');
  assert.equal(result.values.configuration.primaryUrl, googleReviewUrl(validGoogle.placeId));
});

test('both Current and Classic Google designs pass server configuration validation', () => {
  for (const designId of ['current', 'classic']) {
    const result = validateProductConfiguration({ ...validGoogle, designId });
    assert.equal(result.isValid, true);
    assert.equal(result.values.configuration.designId, designId);
  }
  assert.ok(validateProductConfiguration({ ...validGoogle, designId: 'unknown' }).errors.designId);
});

test('custom configuration requires a supported primary action and keeps its trusted price', () => {
  const missing = validateProductConfiguration({ productId: 'custom', quantity: 1, businessName: 'Test', privacyAccepted: true });
  assert.equal(missing.isValid, false);
  assert.ok(missing.errors.primaryAction);
  const valid = validateProductConfiguration({ productId: 'custom', quantity: 2, businessName: 'Test', primaryAction: 'instagram', primaryUrl: 'https://instagram.com/test', privacyAccepted: true });
  assert.equal(valid.isValid, true);
  assert.equal(valid.values.unitPricePence, 8499);
});

test('unsafe links and unsupported quantities fail validation without a purchase checkbox', () => {
  const result = validateProductConfiguration({ ...validGoogle, quantity: 21, placeId: '', primaryUrl: 'http://example.com', privacyAccepted: false, additionalLinks: [{ label: 'Menu', url: 'javascript:alert(1)' }] });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.quantity);
  assert.ok(result.errors.primaryUrl);
  assert.equal(result.errors.privacyAccepted, undefined);
  assert.ok(result.errors['additionalLinks.0.url']);
});

test('new custom products are disabled at the cart boundary while legacy validation remains intact', () => {
  const cartSource = readFileSync(new URL('../pages/api/cart.js', import.meta.url), 'utf8');
  assert.match(cartSource, /Custom TapRank stands are not currently available/);
});

test('only five additional links are retained', () => {
  const additionalLinks = Array.from({ length: 7 }, (_, index) => ({ label: `Link ${index}`, url: `https://example.com/${index}` }));
  const result = validateProductConfiguration({ ...validGoogle, additionalLinks });
  assert.equal(result.isValid, true);
  assert.equal(result.values.configuration.additionalLinks.length, 5);
});

test('standard bundle pricing is calculated from the trusted catalogue', () => {
  assert.deepEqual(
    [1, 2, 3, 5].map((quantity) => {
      const pricing = linePricingFor('google', quantity);
      return [quantity, pricing.discountPercent, pricing.totalPence, pricing.effectiveUnitPricePence];
    }),
    [
      [1, 0, 6499, 6499],
      [2, 30, 9099, 4550],
      [3, 40, 11698, 3899],
      [5, 50, 16248, 3250],
    ]
  );
  assert.equal(linePricingFor('google', 4), null);
});

test('custom stands do not receive standard-product bundle discounts', () => {
  assert.deepEqual(linePricingFor('custom', 3), {
    quantity: 3,
    unitPricePence: 8499,
    regularTotalPence: 25497,
    totalPence: 25497,
    effectiveUnitPricePence: 8499,
    discountPercent: 0,
    label: '3 stands',
  });
});

test('cart totals are rebuilt from server-authoritative bundle pricing', () => {
  const cart = sanitiseCartForBrowser({ id: 'cart-1', status: 'active' }, [{
    id: 'item-1', product_id: 'google', product_name: 'Google Review TapRank', unit_price_pence: 1, quantity: 3, configuration: {}, logo_path: null,
  }]);
  assert.equal(cart.totalPence, 11698);
  assert.equal(cart.regularTotalPence, 19497);
  assert.equal(cart.items[0].discountPercent, 40);
  assert.equal(cart.items[0].lineTotalPence, 11698);
});

test('preview checkout returns to the current trusted deployment origin', () => {
  const request = { headers: { 'x-forwarded-host': 'taprank-preview-123.vercel.app' } };
  assert.equal(checkoutSiteUrl(request, { VERCEL_ENV: 'preview' }), 'https://taprank-preview-123.vercel.app');
  assert.equal(checkoutSiteUrl({ headers: { host: 'localhost:3000' } }, { NODE_ENV: 'development' }), 'http://localhost:3000');
  assert.equal(checkoutSiteUrl({ headers: { host: 'attacker.example' } }, { VERCEL_ENV: 'preview', NEXT_PUBLIC_SITE_URL: 'https://taprank.co.uk/' }), 'https://taprank.co.uk');
});

test('Square webhook endpoint requires raw body verification and never contains a hardcoded secret', () => {
  const source = readFileSync(new URL('../pages/api/square/webhook.js', import.meta.url), 'utf8');
  assert.match(source, /bodyParser:\s*false/);
  assert.match(source, /timingSafeEqual/);
  assert.match(source, /SQUARE_WEBHOOK_SIGNATURE_KEY/);
  assert.doesNotMatch(source, /sandbox-sq0/);
});
