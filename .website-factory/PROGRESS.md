# Development progress

Last updated: 2026-09-04

## Current milestone

Gate 2 — public contact email and legal surfaces. The safe production build has been deployed and verified with canonical URLs and a sitemap while indexing remains disabled.

## Product and platform completed

- [x] Production domain and HTTPS: <https://pathwaystoabroad.com>
- [x] Astro static site and Cloudflare Workers Static Assets deployment
- [x] English root routes and Chinese `/zh/` routes
- [x] Explicit language selection and first-visit browser-language handling
- [x] Localized canonical and `hreflang` metadata
- [x] Country/program schemas, directories, search, and filters
- [x] Official-source, coverage-status, and review-date display
- [x] 33-country directory and 71 program records
- [x] Versioned generic tri-state rule engine and centralized registry
- [x] One shared eight-question profile across covered countries
- [x] Opt-in, versioned browser-only profile storage and clear control
- [x] Legacy country questionnaires redirected to the unified comparison
- [x] Boundary and built-output contract tests for matching/localization/privacy
- [x] Configurable production-gated AdSense code
- [x] AdSense disabled pending account, consent, review, and authorization
- [x] Production metadata/sitemap generation separated from explicit indexing permission
- [x] Non-indexable production build deployed and verified on the public domain

## Ordered release gates

- [x] 1. Production domain and HTTPS verified
- [ ] 2. Working public contact email configured and tested
- [ ] 2. Legal/contact surfaces finalized for the public contact channel
- [ ] 3. Google Search Console property verified
- [x] 4. Production sitemap is generated and reachable
- [ ] 4. Production sitemap submitted in Search Console
- [ ] 5. Live site checked in real mobile and desktop browsers
- [ ] 6. Explicit owner authorization to enable indexing after gates 1–5
- [ ] 6. Production indexing enabled in the correct sequence
- [ ] 7. Consent requirements/configuration complete for advertising
- [ ] 7. Real AdSense publisher and slot IDs configured
- [ ] 7. Ad placements reviewed and explicitly authorized for activation

The earlier indexable deployment was a release-order defect, not completion of gate 6. It was corrected on 2026-09-04: the live homepage emits `noindex, nofollow, noarchive`, live `robots.txt` emits `Disallow: /`, and the sitemap remains reachable. Only the separately named indexable build can reopen indexing.

## Next actions

1. Configure and test the public contact email/forwarding and update legal surfaces.
2. Verify Google Search Console ownership.
3. Submit the production sitemap.
4. Complete real mobile and desktop live-site QA.
5. Request explicit indexing authorization.

## Deferred

- Further country expansion toward 100+ after the release sequence is stable
- AdSense account connection and production activation
- Free/paid report boundary and pricing
- Grounded report data contract and LLM provider
- Payment, checkout, accounts, transactional email, and report delivery
