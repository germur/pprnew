# Local service content and reviewed URL equivalents

The first batch deepens service information on Bonita Springs (fire/smoke), Cooper City (flood cleanup), Deerfield Beach (storm intrusion) and Hobe Sound (water/mold). It adds assessed scope, access and documentation details, relevant service links and visitor questions without inventing local offices, completed jobs or turnaround promises.

`src/data/city-service-focus.ts` owns these four editorial entries and metadata. `CityServiceFocus.astro` renders only configured cities. Existing project stories and other cities retain their own content.

The new `/resources/mold-testing-cost/` resource explains estimate components without invented prices. The guide cites the EPA for the purpose and limitations of sampling. Its source is https://www.epa.gov/mold/mold-testing-or-sampling.

Six reviewed legacy paths receive explicit 301 rules, including slash variants, before the broader retirement rules. Destinations include substantive matching content and their own canonical URLs. Other removed services and unreviewed city combinations retain their existing handling. See `public/_redirects` for the complete mapping.

Shared service pages now link to relevant local sections. Resource card descriptions match the pages they open; the mold article's inspection/remediation links point to the appropriate services. The featured resource stacks on smaller screens.

The measurement baseline and connected analytics exports are kept outside this public repository. Deployment date should be recorded separately when these changes reach production. Ranking changes are not established by implementation or a successful build.

Validation: production build and built-site audit, existing navigation/form/API tests, reviewed redirect precedence and canonical destinations, desktop/mobile presentation and FAQ behavior. The local Astro preview does not apply Netlify redirect rules; verify those on a Netlify preview or production deployment.
