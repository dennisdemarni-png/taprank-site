import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
// Load dependency-free public configuration without altering the project's module mode.
const load = path => import(`data:text/javascript;base64,${Buffer.from(readFileSync(new URL(path, import.meta.url))).toString('base64')}`);
const { CHECKOUTS, checkoutFor, EXISTING_STANDARD_CHECKOUT_URL, ETSY_URL } = await load('../lib/commerce.js');
const { variants, assets, actions, faqs } = await load('../components/homepage/content.js');

test('every variant has its own checkout gate; pending and unknown products fail closed', () => {
  assert.deepEqual(Object.keys(CHECKOUTS), ['google', 'instagram', 'tripadvisor', 'custom']);
  for (const id of Object.keys(CHECKOUTS)) {
    assert.equal(checkoutFor(id), null, `${id} must remain disabled until URL and price approval`);
  }
  assert.equal(checkoutFor('unknown'), null);
  assert.equal(checkoutFor('__proto__'), null);
  assert.equal(EXISTING_STANDARD_CHECKOUT_URL, 'https://square.link/u/kbq7PFVV');
  assert.equal(CHECKOUTS.google.url, 'https://checkout.square.site/merchant/MLXDQB4BMJPQH/checkout/QEE7T4LHYXE4RLFO5HYWE66S');
  assert.equal(ETSY_URL, null);
});
test('Google defaults and all four offers use the approved current GBP prices', () => {
  assert.deepEqual(variants.map(({id, price}) => [id, price]), [['google','64.99'],['instagram','64.99'],['tripadvisor','64.99'],['custom','84.99']]);
  assert.ok(!/39\.99|69\.99/.test(JSON.stringify({variants, faqs})));
});
test('all referenced approved assets exist with exact case and filename', () => {
  const paths = [assets.logo, assets.whiteLogo, assets.laserPage, assets.spacePage, assets.video, ...Object.values(assets.platforms), ...variants.map(v => v.image), ...actions.flatMap(a => [a.image, a.extraImage].filter(Boolean))];
  for (const path of paths) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
});
test('unapproved Vercel production builds fail while Preview and local builds are allowed', () => {
  for (const [vercel, target, status] of [['1', 'production', 1], ['1', '', 1], ['1', 'preview', 0], ['', '', 0]]) {
    const result = spawnSync(process.execPath, ['scripts/assert-preview.mjs'], { env: { ...process.env, VERCEL: vercel, VERCEL_ENV: target } });
    assert.equal(result.status, status, `${vercel}/${target}`);
  }
});
