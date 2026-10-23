// CompanyCam may return fewer items than per_page requests. Only an empty page
// marks completion; a short page must not silently truncate the catalog.
export async function paginate(loadPage, { maxPages = 500 } = {}) {
  const items = [];
  const seen = new Set();
  for (let page = 1; page <= maxPages; page++) {
    const batch = await loadPage(page);
    if (!Array.isArray(batch)) throw new Error('Unexpected CompanyCam response');
    if (batch.length === 0) return items;
    let added = 0;
    for (const item of batch) {
      if (item.id == null) throw new Error('CompanyCam item has no id');
      if (!seen.has(String(item.id))) {
        items.push(item); seen.add(String(item.id)); added++;
      }
    }
    if (!added) throw new Error('CompanyCam pagination repeated a page');
  }
  throw new Error('CompanyCam pagination safety limit reached');
}
