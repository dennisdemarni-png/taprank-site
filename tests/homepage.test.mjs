import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
// Load dependency-free public configuration without altering the project's module mode.
const load = path => import(`data:text/javascript;base64,${Buffer.from(readFileSync(new URL(path, import.meta.url))).toString('base64')}`);
const { CHECKOUTS, checkoutFor, EXISTING_STANDARD_CHECKOUT_URL, ETSY_URL } = await load('../lib/commerce.js');
const { variants, assets, actions, faqs, googleDesigns } = await load('../components/homepage/content.js');

test('approved variants map to their exact Square destinations; unknown products fail closed', () => {
  const expected = {
    google: 'https://square.link/u/kbq7PFVV',
    instagram: 'https://square.link/u/Nr0kuTQ2',
    tripadvisor: 'https://square.link/u/fuQpb9Eo',
    custom: 'https://square.link/u/tzzKvksd',
  };
  assert.deepEqual(Object.keys(CHECKOUTS), Object.keys(expected));
  for (const [id, url] of Object.entries(expected)) assert.equal(checkoutFor(id), url);
  assert.equal(checkoutFor('unknown'), null);
  assert.equal(checkoutFor('__proto__'), null);
  assert.equal(EXISTING_STANDARD_CHECKOUT_URL, expected.google);
  assert.equal(ETSY_URL, 'https://taprank.etsy.com/uk/listing/4569990571/google-review-nfc-stand-qr-code-review');
});
test('Google defaults and all four offers use the approved current GBP prices', () => {
  assert.deepEqual(variants.map(({id, price}) => [id, price]), [['google','64.99'],['instagram','64.99'],['tripadvisor','64.99'],['custom','84.99']]);
  assert.ok(!/39\.99|69\.99/.test(JSON.stringify({variants, faqs})));
});
test('all referenced approved assets exist with exact case and filename', () => {
  const paths = [assets.logo, assets.whiteLogo, assets.googleClassic, assets.restaurantPage, assets.spacePage, assets.video, assets.videoPoster, ...Object.values(assets.platforms), ...variants.map(v => v.image), ...actions.flatMap(a => [a.image, a.extraImage].filter(Boolean))];
  for (const path of paths) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
});

test('Google New Design defaults while Classic and unknown designs cannot reach checkout', () => {
  assert.equal(googleDesigns[0].id, 'new');
  assert.equal(googleDesigns[0].image, assets.google);
  assert.equal(googleDesigns[1].image, assets.googleClassic);
  assert.equal(googleDesigns[1].soldOut, true);
  assert.equal(checkoutFor('google', 'new'), 'https://square.link/u/kbq7PFVV');
  assert.equal(checkoutFor('google', 'classic'), null);
  assert.equal(checkoutFor('google', 'unknown'), null);
  assert.equal(CHECKOUTS.google.classic.url, null);
});


test('storefront tracking keeps checkout starts distinct from purchases and excludes private fields', async () => {
  const { homepageEvent } = await load('../lib/homepageEvents.js');
  const calls = [];
  globalThis.window = { location: { pathname: '/' }, fbq: (...args) => calls.push(args) };
  try {
    for (const variant of ['google', 'instagram', 'tripadvisor', 'custom']) homepageEvent('square_checkout_click', { variant, email: 'private@example.com' });
    assert.deepEqual(calls.map(c => c[2].value), [64.99, 64.99, 64.99, 84.99]);
    assert.ok(calls.every(c => c[1] === 'InitiateCheckout' && !('email' in c[2])));
    homepageEvent('square_checkout_click', { variant: 'google', design: 'classic' });
    homepageEvent('Purchase', { variant: 'google' });
    window.location.pathname = '/r/restaurant-demo';
    homepageEvent('variant_selected', { variant: 'google' });
    assert.equal(calls.length, 4);
    window.location.pathname = '/';
    window.fbq = () => { throw Error('blocked'); };
    assert.doesNotThrow(() => homepageEvent('hero_buy_click'));
  } finally { delete globalThis.window; }
});
