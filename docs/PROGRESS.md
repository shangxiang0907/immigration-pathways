# Development progress

Last updated: 2026-09-03

## Current milestone

M2/M3 — Expand verified country coverage while connecting reviewed paths to unified matching

## Completed

- [x] Astro static-site baseline with preview `noindex`
- [x] Country and immigration-program schemas
- [x] Country directory, region filter, and name search
- [x] Country detail and program-directory templates
- [x] Coverage status, official source, and review-date display
- [x] Directory-only seed entries for Canada, Germany, and the Netherlands
- [x] English-default and Chinese-localized URL strategy approved
- [x] English root pages and `/zh/` localized equivalents
- [x] Explicit language switch and first-visit browser-language detection
- [x] Localized production canonical and `hreflang` metadata
- [x] Multilingual routing quality review
- [x] Directory-only government entry points for 13 countries
- [x] First reviewed batch: Canada's three federal Express Entry programs
- [x] English and Chinese program directories and detail pages
- [x] Privacy-preserving browser-only Canada pre-screen
- [x] Deterministic `potential match`, `does not meet`, and `more information needed` outcomes
- [x] Boundary-case tests for the initial Canada matching rules
- [x] First reviewed Australia batch: skilled visa subclasses 189, 190, and 491
- [x] Program keyword, country, and category filters
- [x] Browser-only Australia 189/190/491 pre-screen and boundary tests
- [x] First reviewed Germany batch: EU Blue Card, qualified-professional visa, and opportunity card
- [x] Browser-only Germany pathway pre-screen and boundary tests
- [x] Versioned generic tri-state rule engine
- [x] First declarative rule migration: Australia
- [x] Declarative rule migrations for all nine reviewed Canada, Australia, and Germany programs
- [x] Central matching registry and build-time rule/profile schema validation
- [x] Lightweight unified eight-question profile and cross-country comparison
- [x] Opt-in, versioned browser-only profile storage and clear control
- [x] Replaced unused goal input with a qualification-assessment signal used by country rules
- [x] Retired country-specific questionnaires; legacy URLs redirect to the unified comparison
- [x] Tested cross-country ranking with conservative pathway-count result summaries
- [x] Closest-path links and concise explanations for user-triggered known barriers
- [x] Built-output contract tests for both locales, privacy controls, no-upload client code, and legacy redirects
- [x] Versioned profile-cache migration and complete local-storage privacy disclosure
- [x] Reduced-motion-aware result navigation and explicitly labelled live results
- [x] Reviewed New Zealand skilled-residence batch: SMC, Straight to Residence, and Work to Residence
- [x] New Zealand connected to the unified profile and country ranking
- [x] Reviewed principal pathways and unified matching for the United Kingdom, Ireland, Netherlands, France, Portugal, Spain, Japan, Singapore, and United States
- [x] Expanded the official country directory from 13 to 21 countries
- [x] Reviewed and connected two principal pathways each for Austria, Denmark, Finland, and Norway
- [x] Owner set the next milestone order: country coverage, then Google AdSense support, then LLM reports

## Next

- [ ] Finish the planned country-directory expansion and principal-path coverage
- [ ] Add production-gated, configurable Google AdSense support after country coverage
- [ ] Define the free-result boundary and low-priced report contents
- [ ] After AdSense support, draft the grounded report data contract before choosing an LLM or backend

## Secondary validation

- [ ] Validate the unified flow in a real browser at representative mobile and desktop widths when a browser is available

## Requires a later production/configuration decision

- Production domain and indexing
- Real AdSense publisher/slot IDs, account connection, consent configuration, and production activation
- Payment, checkout, accounts, and report delivery
- Transactional email configuration
