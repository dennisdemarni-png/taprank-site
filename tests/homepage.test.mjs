import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
// Load dependency-free public configuration without altering the project's module mode.
const load = path => import(`data:text/javascript;base64,${Buffer.from(readFileSync(new URL(path, import.meta.url))).toString('base64')}`);
const { CHECKOUTS, checkoutFor, EXISTING_STANDARD_CHECKOUT_URL, ETSY_URL, PRODUCT_CATALOG, productFor } = await load('../lib/commerce.js');
const { variants, assets, actions, faqs, googleDesigns, productLandingContent } = await load('../components/homepage/content.js');

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
test('server checkout catalogue preserves exact prices and fails closed for unknown products', () => {
  assert.deepEqual(Object.fromEntries(Object.entries(PRODUCT_CATALOG).map(([id, item]) => [id, item.pricePence])), { google: 6499, instagram: 6499, tripadvisor: 6499, custom: 8499 });
  assert.equal(productFor('google').pricePence, 6499);
  assert.equal(productFor('unknown'), null);
  assert.equal(productFor('__proto__'), null);
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

test('dedicated product routes reuse the approved catalogue and prices', () => {
  const expected = {
    google: ['/google-review-stand', '64.99'],
    instagram: ['/instagram-stand', '64.99'],
    tripadvisor: ['/tripadvisor-stand', '64.99'],
    custom: ['/custom-taprank', '84.99'],
  };
  assert.deepEqual(Object.fromEntries(Object.entries(productLandingContent).map(([id, product]) => [id, [product.route, product.price]])), expected);
  for (const [id, [route]] of Object.entries(expected)) {
    assert.ok(existsSync(new URL(`../pages${route}.jsx`, import.meta.url)), `${id} route`);
    assert.equal(productLandingContent[id].image, variants.find(variant => variant.id === id).image);
  }
});

test('public support email and external-link rules are centralised', async () => {
  const { TAPRANK_CONTACT } = await load('../lib/contact.js');
  const { isExternalWebLink, externalLinkProps } = await load('../lib/publicLinks.js');
  assert.equal(TAPRANK_CONTACT.email, 'Info@taprank.co.uk');
  assert.deepEqual(externalLinkProps('https://square.link/u/example'), { target: '_blank', rel: 'noopener noreferrer' });
  assert.equal(isExternalWebLink('https://www.taprank.co.uk/privacy'), false);
  assert.equal(isExternalWebLink('/google-review-stand'), false);
  assert.equal(isExternalWebLink('mailto:Info@taprank.co.uk'), false);
});

test('demo pages are explicitly flagged and their shared UI uses in-page controls', async () => {
  const pageSource = readFileSync(new URL('../components/HostedTapRankPage.jsx', import.meta.url), 'utf8');
  const dataSource = readFileSync(new URL('../lib/taprankPages.js', import.meta.url), 'utf8');
  assert.match(pageSource, /if \(isDemo\).*?<button/s);
  assert.match(pageSource, /Demo preview — this action would open the business’s live link\./);
  assert.equal((dataSource.match(/isDemo: true/g) || []).length, 3);
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

test('product landing events use the existing allowlisted Meta integration', async () => {
  const { homepageEvent } = await load('../lib/homepageEvents.js');
  const calls = [];
  globalThis.window = { location: { pathname: '/google-review-stand' }, fbq: (...args) => calls.push(args) };
  try {
    homepageEvent('product_page_view', { variant: 'google' });
    homepageEvent('demo_video_play', { variant: 'google' });
    homepageEvent('square_checkout_click', { variant: 'google' });
    assert.deepEqual(calls.map(call => call[0]), ['trackCustom', 'trackCustom', 'track']);
    assert.equal(calls[2][1], 'InitiateCheckout');
    assert.ok(calls.every(call => call[2].page_type === 'product_landing'));
  } finally { delete globalThis.window; }
});
