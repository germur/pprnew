# Service-area directory refresh

The service-area hub now helps visitors find a city instead of scrolling through a long sequence of large, repeated cards. It preserves all 35 city destinations and the six existing regions.

## Presentation and content

- A focused introduction, derived city/region totals and a direct link to the finder.
- Region cards with alphabetical city links, a desktop region sidebar and a native region selector on smaller screens.
- Photo badges only for cities represented in the reviewed `selected-projects.json` catalog, plus three previews linking to the existing project gallery.
- Existing approved Cape Coral project photography replaces the illustrative map, whose labels did not match the city directory.
- Geographic metadata now describes Florida coverage, including Central Florida. Copy no longer claims universal project documentation, before/after comparisons or arrival-time guarantees, and removes internal product terminology.
- Clear help for unlisted locations and short questions about availability, city information and commercial requests.

## Finder behavior

`public/service-areas.js` enhances the server-rendered directory. City and region searches intersect with the selected region. Normalization accepts accents, punctuation and common Fort/Saint abbreviations. Counts, empty results, clear and reset controls update together. Filtered states can be shared using `q` and `region` URL parameters; the canonical remains the directory URL.

All city links and region jump links are usable without JavaScript. Search controls remain hidden until enhancement succeeds; no external geolocation, map service or new source of coverage data is required. Filtering never adds unlisted destinations. Search input is handled as text.

## Validation

- Production build retains 56 pages and 54 sitemap URLs.
- 18 automated tests: existing form/navigation/API checks and four finder tests for aliases, region matching, intersections, reset behavior and unknown places.
- Built-site structure/link audit and explicit check of all 35 directory links, ItemList entries and non-JavaScript visibility.
- Browser checks: search, selected regions, zero results, reset, shared-filter reload, city destination and responsive layouts at 320, 390 and desktop widths.

This refresh changes the hub, its dedicated interaction module and tests; it does not expand the service-area list or alter existing city routes.
