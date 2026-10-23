/** Normalize common Florida city-name variants without inventing coverage. */
export function normalizeAreaSearch(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\./g, '').replace(/[^a-z0-9]+/g, ' ')
    .replace(/\bft\b/g, 'fort').replace(/\bst\b/g, 'saint').trim();
}

export function matchesArea(city, query, selectedRegion = 'all') {
  if (selectedRegion !== 'all' && city.region !== selectedRegion) return false;
  const haystack = normalizeAreaSearch(`${city.name} ${city.regionName}`);
  return normalizeAreaSearch(query).split(' ').filter(Boolean).every(token => haystack.includes(token));
}

export function initAreaDirectory(root) {
  if (!root) return;
  const input = root.querySelector('#area-search');
  const buttons = [...root.querySelectorAll('[data-area-region]')];
  const regionSelect = root.querySelector('#area-region-select');
  const groups = [...root.querySelectorAll('[data-area-group]')];
  const entries = [...root.querySelectorAll('[data-area-city]')];
  const status = root.querySelector('[data-area-status]');
  const empty = root.querySelector('[data-area-empty]');
  const clear = root.querySelector('[data-area-clear]');
  if (!input || !regionSelect || !buttons.length || !status || !empty || !clear) return;

  const validRegions = new Set(buttons.map(button => button.dataset.areaRegion));
  const initial = new URL(window.location.href);
  let region = validRegions.has(initial.searchParams.get('region')) ? initial.searchParams.get('region') : 'all';
  input.value = (initial.searchParams.get('q') || '').slice(0, 120);

  const apply = (updateAddress = true) => {
    let count = 0;
    let visibleGroups = 0;
    entries.forEach(entry => {
      entry.hidden = !matchesArea({ name: entry.dataset.name, region: entry.dataset.region, regionName: entry.dataset.regionName }, input.value, region);
      if (!entry.hidden) count++;
    });
    groups.forEach(group => {
      const groupCount = [...group.querySelectorAll('[data-area-city]')].filter(entry => !entry.hidden).length;
      group.hidden = groupCount === 0;
      group.querySelector('[data-area-group-count]').textContent = `${groupCount} ${groupCount === 1 ? 'city' : 'cities'}`;
      if (groupCount) visibleGroups++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.areaRegion === region)));
    regionSelect.value = region;
    root.querySelector('.directory-region-grid').classList.toggle('has-single-region', visibleGroups === 1);
    clear.hidden = input.value.length === 0;
    clear.setAttribute('aria-label', 'Clear city search');
    empty.hidden = count > 0;
    const selectedName = groups.find(group => group.dataset.areaGroup === region)?.querySelector('h3')?.textContent;
    status.textContent = count === 0 ? 'No listed cities match your filters.' : `Showing ${count} ${count === 1 ? 'city' : 'cities'} ${region === 'all' ? `across ${visibleGroups} ${visibleGroups === 1 ? 'region' : 'regions'}` : `in ${selectedName}`}`;
    if (updateAddress) {
      const url = new URL(window.location.href);
      const query = input.value.trim();
      if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
      if (region !== 'all') url.searchParams.set('region', region); else url.searchParams.delete('region');
      // Sharing a filtered directory never changes which city URLs are rendered.
      try { window.history.replaceState(null, '', url); } catch { /* Filtering still works without history access. */ }
    }
  };
  input.addEventListener('input', () => apply());
  regionSelect.addEventListener('change', () => { region = regionSelect.value; apply(); });
  root.querySelector('form').addEventListener('submit', event => { event.preventDefault(); apply(); });
  buttons.forEach(button => button.addEventListener('click', () => { region = button.dataset.areaRegion; apply(); }));
  clear.addEventListener('click', () => { input.value = ''; apply(); input.focus(); });
  root.querySelector('[data-area-reset]').addEventListener('click', () => { region = 'all'; input.value = ''; apply(); input.focus(); });

  apply(false);
  root.querySelector('[data-area-controls]').hidden = false;
  root.querySelector('[data-area-filters]').hidden = false;
  root.querySelector('[data-area-jumps]').hidden = true;
  root.querySelector('[data-area-layout]').classList.add('is-enhanced');
}

if (typeof document !== 'undefined') initAreaDirectory(document.querySelector('[data-area-directory]'));
