# Technical SEO review — October 24, 2026

## Scope and findings

Reviewed the generated HTML for all 56 routes, the 54 canonical sitemap URLs,
robots.txt, internal links/assets/fragments, schema graphs, metadata, and initial
HTML discoverability. Hosting checks are a separate step, recorded below.

The existing site already had unique titles and descriptions, clean canonical
URLs, an XML sitemap, and server-rendered content. This change repairs omissions
and inconsistent entity data rather than replacing those foundations.

| Area | Finding and resulting behavior |
| --- | --- |
| Business schema | A single stable LocalBusiness identity now has the same description and Miami address on every indexable page. The 35 listed service cities do not become fictitious branch offices. |
| Contact hours | 24/7 availability belongs to the customer-service ContactPoint; unverified physical-office hours and supported-language claims have been removed. |
| Page entities | WebSite and WebPage/CollectionPage/ContactPage entities connect each page to the publisher and site. |
| Services | Six service pages and 35 city pages describe Service entities linked to the real provider. |
| Articles | The two actual resource guides have Article entities and article social metadata. Only the mold guide declares its visibly displayed modification date. No invented author, publication date, reviewer, price, review score or medical credential is supplied. |
| Breadcrumbs | Indexable nested routes have breadcrumb targets that exist. Error helpers omit schemas and canonical tags, avoiding a fabricated `/404.html/` breadcrumb. |
| Metadata | Titles/descriptions remain unique; Open Graph and Twitter cards include descriptive image alternatives. Existing approved project photos are used for service, mold-guide and documented city shares. Other pages use the business logo. |
| Canonicals | One absolute production self-canonical per indexable page. Filters and unused query parameters consolidate to their clean directory URL. |
| Pagination | All eight approved projects, 35 city links and current resource links are present in initial HTML. There is no actual paginated series requiring page-2 canonicals. API import pagination already has regression coverage for partial/overlapping/repeated pages. |
| Sitemap | Exactly the 54 indexable canonical routes; error helpers excluded. Former WordPress sitemap names now redirect to the current sitemap index. No fabricated last-modified dates. |
| Robots | Production content remains crawlable. Deploy-preview and branch-deploy HTML explicitly use noindex, in addition to Netlify's observed preview response header. |
| Duplicate host | The default production `paramountpropertyrestoration.netlify.app` host previously returned 200. Host-specific permanent redirect rules consolidate it to the primary domain while leaving deploy previews accessible. |
| Legacy URLs | Existing substantive 301 migrations and intentional 410 removals remain in place. No blanket redirect of missing content to the homepage. |
| Hreflang | Not applicable: the site currently publishes English pages only. No imaginary Spanish alternates are declared. |

## Verification

- Production-mode build: 56 HTML pages, 54 unique canonical sitemap URLs.
- Automated technical audit: zero issues; 41 Service entities, two Articles,
  53 BreadcrumbLists, six existing FAQPage blocks and one city ItemList.
- Existing built-site link/accessibility inventory: zero issues.
- Editorial consistency audit: all 28 visible FAQ answers match their six schemas.
- Existing application tests: 18 pass.
- Forms are outside this task and remain unchanged.

The structured data checks parse JSON, validate our entity/reference invariants,
check real breadcrumb targets and compare FAQ markup with visible content. They
are not a claim of third-party Schema.org or Google Rich Results Test certification.
Google's May 2026 FAQ rich-result retirement means valid FAQPage markup should
not be presented as a promise of FAQ search enhancements.

Hosting validation on [PR #7 preview](https://deploy-preview-7--paramountpropertyrestoration.netlify.app/):
all 54 canonical content routes returned 200 without redirects, retained their
production canonical and were protected by noindex. All 106 tested exact legacy
and sitemap redirect rules plus missing-route/removed-route controls passed their
expected 301, 404 or 410 checks. Error responses contained noindex. The preview
build completed successfully. Raw request logs are retained privately, outside
this public repository.
The host-consolidation rule requires a production recheck after publication,
because a preview cannot exercise a rule restricted to the production hostname.

## Limits and next checks

This review validates technical signals; it does not prove that Google has
indexed every route or selected every declared canonical. After publication,
inspect representative home/service/city/article URLs in Search Console, confirm
the submitted sitemap and watch indexing/duplicate-page reports. Query ranking
and content opportunity analysis remains a separate GSC performance exercise.

Core Web Vitals require real-user or PageSpeed evidence; a successful build or
clean metadata audit is not a performance score. Direct error-helper URLs may
return 200 with noindex; the meaningful checks are missing URLs returning 404
and intentionally removed URLs returning 410. Verify these response codes on
the hosting preview and production rather than inferring them from local files.

When a real paginated collection is introduced, render crawlable next-page links,
give each page its own URL and self-canonical, and expose every item without
requiring a user action or fragment navigation. Do not canonicalize actual page
2 and later pages to page 1. Current filters are views of an already complete list.

## Primary references

- [Google: canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: pagination](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Schema.org: availableLanguage domains](https://schema.org/availableLanguage)
- [Google Search updates: FAQ retirement](https://developers.google.com/search/updates)
- [Netlify: domain-level redirects and query handling](https://docs.netlify.com/manage/routing/redirects/redirect-options/)
