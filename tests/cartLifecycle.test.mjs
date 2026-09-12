import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  checkoutMatchesCart,
  checkoutSnapshot,
  isEditableCartStatus,
  squareLineItems,
} from '../lib/cartLifecycle.js';

const products = [
  { product_id: 'google', product_name: 'Google Review TapRank', unit_price_pence: 6499, quantity: 1, pricing: { totalPence: 6499, discountPercent: 0 }, configuration: { businessName: 'Google Business' }, logo_path: null },
  { product_id: 'instagram', product_name: 'Instagram TapRank', unit_price_pence: 6499, quantity: 1, pricing: { totalPence: 6499, discountPercent: 0 }, configuration: { businessName: 'Instagram Business' }, logo_path: null },
  { product_id: 'tripadvisor', product_name: 'Tripadvisor TapRank', unit_price_pence: 6499, quantity: 1, pricing: { totalPence: 6499, discountPercent: 0 }, configuration: { businessName: 'Tripadvisor Business' }, logo_path: null },
];

test('active and legacy checkout-started carts remain one editable shopper cart', () => {
  assert.equal(isEditableCartStatus('active'), true);
  assert.equal(isEditableCartStatus('checkout_started'), true);
  assert.equal(isEditableCartStatus('converted'), false);
  assert.equal(isEditableCartStatus('expired'), false);
});

test('Google, Instagram and Tripadvisor remain separate lines in one checkout snapshot', () => {
  const snapshot = checkoutSnapshot(products);
  assert.deepEqual(snapshot.map((item) => item.productId), ['google', 'instagram', 'tripadvisor']);
  const squareItems = squareLineItems(products);
  assert.equal(squareItems.length, 3);
  assert.deepEqual(squareItems.map((item) => item.name), ['Google Review TapRank', 'Instagram TapRank', 'Tripadvisor TapRank']);
  assert.equal(squareItems.reduce((total, item) => total + item.base_price_money.amount * Number(item.quantity), 0), 19497);
});

test('only an exact current cart snapshot reuses an unpaid checkout', () => {
  const snapshot = checkoutSnapshot(products);
  const order = { status: 'checkout_created', total_pence: 19497, cart_snapshot: snapshot, square_checkout_url: 'https://sandbox.square.link/u/test' };
  assert.equal(checkoutMatchesCart(order, snapshot, 19497), true);
  assert.equal(checkoutMatchesCart(order, checkoutSnapshot(products.slice(0, 2)), 12998), false);
  assert.equal(checkoutMatchesCart(order, checkoutSnapshot([products[0], products[2]]), 12998), false);
});

test('cart mutation invalidates previous Square checkout before add or removal', () => {
  const source = readFileSync(new URL('../pages/api/cart.js', import.meta.url), 'utf8');
  assert.equal((source.match(/invalidateOpenCheckoutsForCart\(cart\.id\)/g) || []).length, 2);
  assert.match(source, /invalidateOpenCheckoutsForCart\(cart\.id\)[\s\S]*storefront_cart_items"\)\.insert/);
  assert.match(source, /invalidateOpenCheckoutsForCart\(cart\.id\)[\s\S]*storefront_cart_items"\)\.delete/);
});

test('opening or abandoning checkout does not lock the cart and unpaid items stay removable', () => {
  const checkoutSource = readFileSync(new URL('../pages/api/checkout.js', import.meta.url), 'utf8');
  const drawerSource = readFileSync(new URL('../components/product/CartDrawer.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(checkoutSource, /storefront_carts[\s\S]{0,180}checkout_started/);
  assert.doesNotMatch(drawerSource, /const locked|Return to secure Square checkout/);
  assert.match(drawerSource, />Remove<\/button>/);
});

test('verified completed payment closes the matching cart while abandoned checkout does not', () => {
  const webhookSource = readFileSync(new URL('../pages/api/square/webhook.js', import.meta.url), 'utf8');
  assert.match(webhookSource, /payment\?\.status === "COMPLETED"/);
  assert.match(webhookSource, /status: "converted"/);
  assert.doesNotMatch(webhookSource, /status: "converted"[\s\S]{0,120}(?:checkout_created|checkout_pending)/);
});

test('product page hydrates the saved cart before showing an empty state', () => {
  const landingSource = readFileSync(new URL('../components/product/ProductLanding.jsx', import.meta.url), 'utf8');
  const drawerSource = readFileSync(new URL('../components/product/CartDrawer.jsx', import.meta.url), 'utf8');
  assert.match(landingSource, /cartHydrated/);
  assert.match(drawerSource, /Loading your cart…/);
});
