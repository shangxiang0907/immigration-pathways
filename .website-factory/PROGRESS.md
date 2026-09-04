# Development progress

Last updated: 2026-09-04

## Current milestone

Static release sequencing correction. The site content and unified matcher are functional, but indexing was enabled before contact email, Search Console, sitemap submission, and live browser QA. The next safe action is to restore non-indexable production output, then complete the gates in order.

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

Known exception: production currently emits indexable robots/sitemap behavior even though gates 2–5 are incomplete. Treat this as a release-order defect, not as completion of gate 6.

## Next actions

1. Restore the production site to a non-indexable state.
2. Configure and test the public contact email/forwarding and update legal surfaces.
3. Verify Google Search Console ownership.
4. Submit the production sitemap.
5. Complete real mobile and desktop live-site QA.
6. Request explicit indexing authorization.

## Deferred

- Further country expansion toward 100+ after the release sequence is stable
- AdSense account connection and production activation
- Free/paid report boundary and pricing
- Grounded report data contract and LLM provider
- Payment, checkout, accounts, transactional email, and report delivery
