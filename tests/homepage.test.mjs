import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
// Load dependency-free public configuration without altering the project's module mode.
const load = path => import(`data:text/javascript;base64,${Buffer.from(readFileSync(new URL(path, import.meta.url))).toString('base64')}`);
const { CHECKOUTS, checkoutFor, EXISTING_STANDARD_CHECKOUT_URL, ETSY_URL } = await load('../lib/commerce.js');
const { variants, assets, actions, faqs } = await load('../components/homepage/content.js');

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
  const paths = [assets.logo, assets.whiteLogo, assets.restaurantPage, assets.spacePage, assets.video, ...Object.values(assets.platforms), ...variants.map(v => v.image), ...actions.flatMap(a => [a.image, a.extraImage].filter(Boolean))];
  for (const path of paths) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
});
