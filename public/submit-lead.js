/** A successful HTTP response confirms receipt, not dispatch or a callback. */
export async function submitLead(data, { fetchImpl = globalThis.fetch, timeoutMs = 15000 } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Form submission failed (${response.status})`);
  } finally {
    clearTimeout(timeout);
  }
}
