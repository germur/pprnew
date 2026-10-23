import test from 'node:test';
import assert from 'node:assert/strict';
import { submitLead } from '../public/submit-lead.js';

test('encodes Netlify fields and waits for acceptance', async () => {
  let accept;
  let finished = false;
  const pending = submitLead(new Map([
    ['form-name', 'contact'], ['name', 'A & B'], ['phone', '+1 786 602 2217'],
  ]), { fetchImpl: (url, options) => {
    assert.equal(url, '/');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded');
    const body = new URLSearchParams(options.body);
    assert.equal(body.get('form-name'), 'contact');
    assert.equal(body.get('name'), 'A & B');
    assert.equal(body.get('phone'), '+1 786 602 2217');
    return new Promise(resolve => { accept = resolve; });
  }}).then(() => { finished = true; });
  await Promise.resolve();
  assert.equal(finished, false);
  accept(new Response(null, { status: 200 }));
  await pending;
  assert.equal(finished, true);
});

for (const status of [400, 404, 429, 500]) {
  test(`rejects HTTP ${status} instead of reporting success`, async () => {
    await assert.rejects(submitLead(new Map(), {
      fetchImpl: async () => new Response(null, { status }),
    }), new RegExp(String(status)));
  });
}

test('propagates network errors for the retry UI', async () => {
  await assert.rejects(submitLead(new Map(), {
    fetchImpl: async () => { throw new TypeError('Offline'); },
  }), /Offline/);
});

test('aborts a stalled request so the form can be used again', async () => {
  await assert.rejects(submitLead(new Map(), {
    timeoutMs: 10,
    fetchImpl: (_, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }),
  }), { name: 'AbortError' });
});

test('form UI preserves failed requests and counts only confirmed leads', async () => {
  const original = Object.fromEntries(['document', 'window', 'location', 'FormData', 'fetch', 'gtag', 'IntersectionObserver'].map(k => [k, globalThis[k]]));
  const fields = [{ style: {} }];
  let focused = '';
  let handler;
  let calls = 0;
  let leads = 0;
  let resolveRequest;
  const button = { innerHTML: 'Send message', disabled: false, style: {} };
  const error = { hidden: true, focus: () => { focused = 'error'; } };
  const success = { style: { display: 'none' }, focus: () => { focused = 'success'; } };
  const form = {
    addEventListener: (event, fn) => { if (event === 'submit') handler = fn; },
    setAttribute: () => {},
    getAttribute: () => 'contact',
    querySelector: selector => selector.includes('button') ? button : selector === '[data-error]' ? error : success,
    querySelectorAll: selector => selector === '[required]' || selector === 'input,select,textarea' ? [] : [...fields, button],
  };
  try {
    globalThis.document = {
      querySelector: () => null,
      querySelectorAll: selector => selector === 'form[data-emergency]' ? [form] : [],
      addEventListener: () => {},
    };
    globalThis.window = { addEventListener: () => {} };
    globalThis.location = { pathname: '/contact/' };
    globalThis.IntersectionObserver = class { observe() {} };
    globalThis.FormData = class extends Map { constructor() { super([['form-name', 'contact']]); } };
    globalThis.gtag = () => { leads++; };
    globalThis.fetch = () => { calls++; return new Promise(resolve => { resolveRequest = resolve; }); };
    await import(`../public/app.js?test=${Date.now()}`);

    const failed = handler({ preventDefault() {} });
    assert.equal(button.disabled, true);
    assert.equal(leads, 0);
    assert.equal(success.style.display, 'none');
    await handler({ preventDefault() {} });
    assert.equal(calls, 1, 'duplicate submits are ignored while pending');
    resolveRequest(new Response(null, { status: 500 }));
    await failed;
    assert.equal(error.hidden, false);
    assert.equal(focused, 'error');
    assert.equal(button.disabled, false);
    assert.equal(fields[0].style.display, undefined, 'fields remain available');
    assert.equal(leads, 0);

    const retry = handler({ preventDefault() {} });
    assert.equal(error.hidden, true);
    resolveRequest(new Response(null, { status: 200 }));
    await retry;
    assert.equal(leads, 1);
    assert.equal(success.style.display, 'block');
    assert.equal(fields[0].style.display, 'none');
    assert.equal(button.style.display, 'none');
    assert.equal(focused, 'success');
    await handler({ preventDefault() {} });
    assert.equal(calls, 2, 'confirmed requests cannot be resubmitted');
  } finally {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  }
});
