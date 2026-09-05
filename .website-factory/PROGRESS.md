# Development progress

Last updated: 2026-09-06

## Current milestone

Last updated: 2026-09-06.

Gate 7 is **reopened**. Adsterra was withdrawn as the advertising provider and
Google AdSense is now the selected provider, so every advertising gate restarts
against AdSense requirements. Advertising is disabled and the site serves no
third-party advertising code at all.

The removal is live. Cloudflare version `b6465612-386a-408b-b2da-ebfc881f63f1`
was deployed on 2026-09-06 and verified, so the deployed origin and this
repository now agree.

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
- [x] Adsterra withdrawn; Google AdSense selected as the advertising provider
- [x] Advertising disabled pending AdSense approval, `ads.txt`, a certified CMP, ad units, and authorization
- [x] Directory-only records excluded from indexing, from the sitemap, and from advertising
- [x] `ads.txt` generated from configuration, authorizing no seller until a publisher ID exists
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
- [ ] 7. AdSense account approved for the production domain
- [ ] 7. `ads.txt` authorizes the publisher account on the live origin
- [ ] 7. Google-certified consent management platform configured for EEA/UK/Swiss traffic
- [ ] 7. Ad units created, placements reviewed, and activation explicitly authorized

The earlier out-of-order indexable deployment was corrected by restoring `noindex` and `Disallow: /`. After gates 1–5 passed and the owner explicitly authorized indexing, the separately gated indexable build was deployed on 2026-09-04. Google may temporarily retain the earlier robots response in its crawler cache.

## Next actions

1. Deepen high-demand country records from directory links into reviewed pathway
   overviews. This is now the prerequisite for AdSense approval, not only a
   content goal: 164 of 197 records are directory-only.
2. Apply for AdSense once reviewed coverage is materially deeper, then work
   release gate 7 in order.
3. Revoke the Adsterra Publisher API token and remove `ADSTERRA_API_TOKEN` from
   the local, Git-ignored `.env.traffic.local`.
4. Decide on the trailing-slash mismatch recorded under "Known defects".

## Advertising integration checkpoint

### Adsterra withdrawal — 2026-09-05

Withdrawn by owner decision on brand and content-quality grounds: an audience
researching immigration is actively targeted by fraud, and creative quality on
that network is not controllable from this repository.

- [x] Removed the placement configuration, the ad component's loader, and the
      hand-rolled consent UI
- [x] Removed the `/api/ad-policy` regional consent endpoint from the Worker
- [x] Removed the Adsterra traffic report script and its `npm` scripts
- [x] Rewrote the bilingual privacy disclosure for AdSense
- [x] Verified the preview and indexable builds emit no Adsterra host, script, or
      container ID
- [x] Deployed on 2026-09-06 as Cloudflare version
      `b6465612-386a-408b-b2da-ebfc881f63f1`; the live origin serves no
      advertising code
- [ ] Revoke the Adsterra Publisher API token and remove `ADSTERRA_API_TOKEN`
      from the local, Git-ignored `.env.traffic.local`. That file is untracked,
      so this cannot be done from the repository.

### AdSense readiness — in progress

Configuration lives in `site.config.mjs` and is enforced by
`src/lib/advertising.mjs`; activation is impossible while any gate is unmet.

- [x] Provider set to `google-adsense` with advertising disabled
- [x] Publisher ID, certified-CMP, `integrationReady`, and 10-digit slot IDs
      required before `enabled` can take effect
- [x] Format allowlist restricted to responsive display units
- [x] `/ads.txt` generated from the publisher ID
- [x] Ad loader and ad units suppressed on 404 and on directory-only records
- [ ] AdSense account approval
- [ ] Google-certified CMP for EEA/UK/Swiss traffic
- [ ] Ad units created and slot IDs recorded
- [ ] Owner authorization to activate

### Thin-content exposure

164 of 197 country records are directory-only. They now render
`noindex, nofollow, noarchive` in every build mode and are excluded from the
sitemap, which drops the submitted URL count from 559 to 230. Deploying this
change will remove those URLs from the index over time; that is intended, both
for search quality and for AdSense review.

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
- AdSense approval, certified CMP, ad units, and production activation
- AdSense earnings reporting (needs the Management API with OAuth, not a static token)
- Free/paid report boundary and pricing
- Grounded report data contract and LLM provider
- Payment, checkout, accounts, transactional email, and report delivery

## Advertising-removal deployment — 2026-09-06

Cloudflare version `b6465612-386a-408b-b2da-ebfc881f63f1`. Verified on the live
origin after deployment:

- [x] `npm test`, `npm run check`, `build:indexable`, and `test:dist:indexable` passed first
- [x] Home, English and Chinese reviewed country records, and program pages return 200 with `index, follow`
- [x] Directory-only records return `noindex, nofollow, noarchive` in both locales
- [x] No page contains an Adsterra host, an `adsbygoogle` reference, or an ad placement
- [x] `/ads.txt` returns the placeholder that authorizes no seller
- [x] `robots.txt` allows crawling and references the production sitemap
- [x] Sitemap returns 200 with 230 URLs; no directory-only record is listed
- [x] The retired `/api/ad-policy` endpoint returns 404
- [x] Unknown route returns 404 and stays `noindex, nofollow, noarchive`
- [x] `www` permanently redirects to the canonical apex domain

Submitted URLs dropped from 559 to 230. Google will drop the 328 excluded
directory URLs over the coming crawls; that is intended.

## Known defects

- Trailing-slash mismatch, pre-existing since the first Cloudflare deployment.
  `astro.config.mjs` sets `trailingSlash: "never"`, and canonical URLs and
  sitemap entries are emitted without a trailing slash, but `wrangler.jsonc`
  sets `html_handling: "auto-trailing-slash"`, so the origin answers
  `/countries/germany` with a 307 to `/countries/germany/`. Every canonical and
  sitemap URL therefore redirects once. Changing `html_handling` to
  `drop-trailing-slash` would align the origin with the emitted metadata, but it
  changes live URL behavior and needs its own authorization and verification.
