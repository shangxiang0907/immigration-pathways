# Development progress

Last updated: 2026-09-04

## Current milestone

Gate 6 — complete. The authorized indexable build is live, and the owner confirmed that Search Console URL Inspection now succeeds for the canonical homepage.

The first live inspection at 2026-09-04 14:00:13 saw Google's cached previous `robots.txt` rule, `Disallow: /`. A later inspection succeeded after the cache refreshed; the public origin continues to return `Allow: /`.

## Product and platform completed

- [x] Production domain and HTTPS: <https://pathwaystoabroad.com>
- [x] Astro static site and Cloudflare Workers Static Assets deployment
- [x] English root routes and Chinese `/zh/` routes
- [x] Explicit language selection and first-visit browser-language handling
- [x] Localized canonical and `hreflang` metadata
- [x] Country/program schemas, directories, search, and filters
- [x] Official-source, coverage-status, and review-date display
- [x] 189-country directory and 71 program records
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
- [ ] 7. Consent requirements/configuration complete for advertising
- [ ] 7. Adsterra website approved and owner-generated banner code reviewed
- [ ] 7. Ad placements reviewed and explicitly authorized for activation

The earlier out-of-order indexable deployment was corrected by restoring `noindex` and `Disallow: /`. After gates 1–5 passed and the owner explicitly authorized indexing, the separately gated indexable build was deployed on 2026-09-04. Google may temporarily retain the earlier robots response in its crawler cache.

## Next actions

1. Continue authoritative directory coverage toward the remaining countries.
2. Keep the current indexable deployment stable; publish content batches only with explicit owner authorization.
3. Complete Adsterra consent, account, code-review, and placement gates before enabling advertising.

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

- [x] Added a 20-country directory-level batch: Belarus, Central African Republic, Comoros, Democratic Republic of the Congo, Republic of the Congo, Equatorial Guinea, Guinea-Bissau, Nauru, Samoa, Federated States of Micronesia, Tonga, Afghanistan, Haiti, Libya, Mali, Tunisia, Senegal, Palestine, Yemen, and Monaco
- [x] Expanded directory coverage from 169 to 189 countries across Africa, Asia, Europe, Oceania, and the Americas
- [x] Added equivalent English and Chinese summaries with explicit directory-only limitations
- [x] Retained an authoritative government URL and 2026-09-04 review date for every record
- [x] Inspected all 20 current authoritative government pages through browser-accessible results
- [x] `npm test`, `npm run check`, `npm run build`, and preview-output tests passed
- [x] Generated 543 static pages with all 189 countries represented in English and Chinese
- [x] Preview output remains non-indexable and advertising remains disabled

## Deferred

- Complete the final country-directory gap beyond 189 where a responsible official source can be verified
- Adsterra account connection, generated banner code, and production activation
- Free/paid report boundary and pricing
- Grounded report data contract and LLM provider
- Payment, checkout, accounts, transactional email, and report delivery
