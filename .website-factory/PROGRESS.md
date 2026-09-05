# Development progress

Last updated: 2026-09-05

## Current milestone

Gate 7 — complete. The authorized regional Adsterra build is live while the existing indexable release remains intact.

The first live inspection at 2026-09-04 14:00:13 saw Google's cached previous `robots.txt` rule, `Disallow: /`. A later inspection succeeded after the cache refreshed; the public origin continues to return `Allow: /`.

## Product and platform completed

- [x] Production domain and HTTPS: <https://pathwaystoabroad.com>
- [x] Astro static site and Cloudflare Workers Static Assets deployment
- [x] English root routes and Chinese `/zh/` routes
- [x] Explicit language selection and first-visit browser-language handling
- [x] Localized canonical and `hreflang` metadata
- [x] Country/program schemas, directories, search, and filters
- [x] Official-source, coverage-status, and review-date display
- [x] Complete 195-country UN-system directory coverage, plus Taiwan and Kosovo (197 country records total), and 71 program records
- [x] Versioned generic tri-state rule engine and centralized registry
- [x] One shared eight-question profile across covered countries
- [x] Opt-in, versioned browser-only profile storage and clear control
- [x] Legacy country questionnaires redirected to the unified comparison
- [x] Boundary and built-output contract tests for matching/localization/privacy
- [x] Google AdSense removed as the selected advertising provider
- [x] Adsterra selected with only Native Banner and Display Banner allowed in principle
- [x] Advertising disabled pending owner-generated code, consent, placement review, and authorization
- [x] Disabled Adsterra migration deployed without third-party advertising scripts
- [x] Production metadata/sitemap generation separated from explicit indexing permission
- [x] Non-indexable production build deployed and verified on the public domain
- [x] Cloudflare Email Routing enabled with a verified destination
- [x] `contact@pathwaystoabroad.com` forwarding rule created

## Ordered release gates

- [x] 1. Production domain and HTTPS verified
- [x] 2. Working public contact email configured and tested
- [x] 2. Legal/contact surfaces finalized for the public contact channel
- [x] 3. Google Search Console property verified
- [x] 4. Production sitemap is generated and reachable
- [x] 4. Production sitemap submitted in Search Console
- [x] 5. Live site checked in real mobile and desktop browsers
- [x] 6. Explicit owner authorization to enable indexing after gates 1–5
- [x] 6. Production indexing enabled in the correct sequence
- [x] 7. Consent requirements/configuration complete for advertising
- [x] 7. Adsterra website approved and owner-generated banner code reviewed
- [x] 7. Ad placements reviewed and explicitly authorized for activation

The earlier out-of-order indexable deployment was corrected by restoring `noindex` and `Disallow: /`. After gates 1–5 passed and the owner explicitly authorized indexing, the separately gated indexable build was deployed on 2026-09-04. Google may temporarily retain the earlier robots response in its crawler cache.

## Next actions

1. Deepen high-demand country records from directory links into reviewed pathway overviews; broad country coverage is complete.
2. Keep the current indexable deployment stable; publish content batches only with explicit owner authorization.
3. Complete Adsterra consent, account, code-review, and placement gates before enabling advertising.

## Advertising integration checkpoint

Completed and deployed on 2026-09-05 as Cloudflare version `b7dfab1c-7b78-4859-aa71-01abbed1213a`.

- [x] Recorded the owner-generated Native Banner, 320×50 mobile banner, and 728×90 desktop banner configuration
- [x] Added explicit accept/reject controls that load no Adsterra resource before opt-in
- [x] Added bilingual privacy disclosure and a persistent withdrawal control
- [x] Changed consent to a regional policy: prior opt-in in EEA/UK/Switzerland, direct loading elsewhere, with a safe prompt fallback
- [x] Added a Cloudflare country-policy endpoint and honored Global Privacy Control before loading ads
- [x] Restricted script origins and dimensions in configuration validation
- [x] Owner authorized the regional, revenue-oriented advertising mode on 2026-09-05
- [x] Set `advertising.enabled` true; preview builds still emit no advertising code
- [x] Reviewed Adsterra publisher terms section 4.9 and its linked privacy/Cookie policies on 2026-09-05
- [x] Verified a temporary production-mode build emits the Native placement on content pages and the responsive display placement on matching pages
- [x] Owner reviewed the monetization tradeoff and explicitly authorized production activation
- [x] Verified the live regional policy endpoint returns direct loading outside prior-consent regions
- [x] Verified live Native and Display placements, privacy withdrawal control, and `index, follow` output
- [x] Headless desktop and mobile checks each issued the expected Adsterra request with no popup, script error, or horizontal overflow
- [ ] Confirm real-user creative fill and impressions in the Adsterra dashboard; headless checks showed reserved ad space but no rendered creative

## Indexable deployment

Owner authorized production indexing on 2026-09-04. Cloudflare version `f67fd88d-fbe2-430c-9559-740cabd47f87` was deployed and verified:

- [x] Representative English and Chinese pages return 200 with `index, follow`
- [x] `robots.txt` allows crawling and references the production sitemap
- [x] Sitemap index returns 200
- [x] Unknown route returns 404 and remains `noindex, nofollow, noarchive`
- [x] `www` permanently redirects to the canonical apex domain

The advertising-provider migration was deployed as Cloudflare version
`4e215b77-7e40-4d24-b992-d32c9a735d49` on 2026-09-04. It preserves the
indexable release while keeping advertising disabled and emitting no Adsterra or
Google advertising scripts.

## Latest live quality review

Completed 2026-09-04 with headless Chromium at 1440×1000 desktop and 390×844 mobile viewports.

- [x] Twelve representative live routes per viewport, including both locales, country sources, and a real 404
- [x] English and Chinese country-directory searches
- [x] Eight-field unified questionnaire and generated results
- [x] No horizontal overflow or unexpected console/page errors
- [x] Contact, privacy, canonical, sitemap, and non-indexing behavior retained
- [x] Desktop and mobile screenshots visually inspected
- [x] English single-result grammar defect found, fixed, deployed, and regression-tested

## Latest content batch

Completed locally on 2026-09-04; publication remains separately gated.

- [x] Added the final eight UN-system country records: Eritrea, Marshall Islands, North Korea, Niger, Sudan, Syria, Tuvalu, and Vatican City
- [x] Completed directory coverage for 193 UN members plus Palestine and Vatican City; Taiwan and Kosovo remain as two additional records, for 197 total
- [x] Added equivalent English and Chinese summaries with explicit directory-only limitations
- [x] Retained an authoritative government URL and 2026-09-04 review date for every record
- [x] Inspected all eight current authoritative government, official diplomatic, or official legal pages through browser-accessible results
- [x] `npm test`, `npm run check`, `npm run build`, and preview-output tests passed
- [x] Generated 559 static pages with all 197 country records represented in English and Chinese
- [x] Preview output remains non-indexable and advertising remains disabled

## Deferred

- Deepen the highest-demand directory records into reviewed pathway overviews
- Adsterra account connection, generated banner code, and production activation
- Free/paid report boundary and pricing
- Grounded report data contract and LLM provider
- Payment, checkout, accounts, transactional email, and report delivery
