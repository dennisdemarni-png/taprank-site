import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
const source = readFileSync(new URL('../lib/metaPixel.js', import.meta.url));
const { META_PIXEL_BASE, trackMetaPageView } = await import(`data:text/javascript;base64,${source.toString('base64')}`);
test('base loads Meta asynchronously and queues exactly one initial PageView with the approved ID', () => {
  const inserted = [];
  const context = { document: { createElement: () => ({}), getElementsByTagName: () => [{ parentNode: { insertBefore: s => inserted.push(s) } }] } };
  context.window = context;
  runInNewContext(META_PIXEL_BASE, context);
  assert.deepEqual(inserted, [{async:true,src:'https://connect.facebook.net/en_US/fbevents.js'}]);
  assert.deepEqual(Array.from(context.fbq.queue, args => Array.from(args)), [['init','1100460359044969'],['track','PageView']]);
});
test('route tracking is safe on the server and calls only PageView in the browser', () => {
  trackMetaPageView();
  const calls = [];
  globalThis.window = { fbq: (...args) => calls.push(args) };
  try { trackMetaPageView(); assert.deepEqual(calls, [['track','PageView']]); }
  finally { delete globalThis.window; }
});
