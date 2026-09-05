# Development plan

Last updated: 2026-09-04

## Product sequence

1. Build a verified immigration-policy directory with official sources.
2. Add deterministic filtering, a unified questionnaire, and comparison.
3. Expand structured coverage toward at least 100 countries in coherent batches.
4. Complete the static-site release sequence and observe the site for one to two weeks.
5. Activate Google AdSense only after approval, ads.txt, certified-CMP, placement, and owner gates pass.
6. Define and validate the free/paid report boundary.
7. Prototype grounded LLM reports only after that validation.
8. Add payment and optional email delivery only with separate owner authorization.

## Architecture for 100+ countries

- One versioned applicant-profile schema shared by every country.
- One short shared questionnaire; no country-specific questionnaire in the primary flow.
- Declarative program rules stored as data, not country-specific UI code.
- One generic evaluator producing `pass`, `fail`, or `unknown` per requirement.
- Unsupported or unsafe-to-derive details remain `unknown` and are explained.
- Country-specific extensions may add structured rule data but not a second engine.
- Profile persistence is browser-only, opt-in, versioned, and visibly clearable.
- Each factual/rule field retains source URL, review date, rule version, and expiry where relevant.

## Content coverage levels

- **Deep:** complete, reviewed program coverage for a small priority group.
- **Overview:** principal pathways and official entry points.
- **Directory:** official authority links only, with no implied policy coverage.

Large country batches may be implemented together, but every record must declare its coverage level. Quantity must not imply equal depth.

## Milestones

### M1 — Information foundation — complete

Schemas, directories, search/filtering, detail templates, provenance display, localization, and build validation.

### M2 — Reviewed country coverage — active

Research authoritative sources in approved batches, record review dates, and expand toward 100+ countries while preserving explicit coverage status.

### M3 — Comparison and matching — functional

Normalized fields, shared questionnaire, generic tri-state evaluation, side-by-side results, and conservative explanations without approval prediction.

### M4 — Static release and advertising — gated

Google AdSense is the selected provider; Adsterra was withdrawn on 2026-09-05 as a brand and content-quality risk for this audience. Only responsive display units are approved in principle; interstitial, vignette, anchor, auto-ads, anti-adblock, forced redirects, and deceptive placements are excluded by configuration.

AdSense imposes gates a plain ad network does not, and the code enforces them:

- Serving EEA/UK/Swiss traffic requires a Google-certified consent management platform. A hand-rolled consent banner does not satisfy Google's EU user consent policy, so `advertising.cmp` must name a certified provider before activation.
- `ads.txt` must authorize the publisher account, so it is generated from `site.config.mjs` and authorizes no seller until a publisher ID exists.
- Ads may not appear on pages without publisher content. Directory-only country records therefore render no ad placement and no AdSense loader.
- Low-value or scaled content is the most common AdSense rejection reason, so directory-only records are also excluded from indexing and from the sitemap.

### M5 — Grounded report prototype — deferred

When resumed: define the data contract first, use only verified structured facts and allowed source URLs, validate structured output, rate-limit the endpoint, and provide a safe fallback. Provider selection comes after the contract.

### M6 — Paid delivery — deferred and separately authorized

Payment webhook, report record, unguessable access token, immediate web access, optional transactional email, retention/deletion/refund/support policy, and ad-free report presentation.

## Mandatory static release order

The order is a dependency chain, not a menu:

1. Verify production domain and HTTPS.
2. Configure a working public contact address and complete legal surfaces.
3. Verify the property in Google Search Console.
4. Verify and submit the production sitemap.
5. Perform real mobile and desktop live-site QA.
6. Obtain explicit owner authorization, then enable indexing.
7. Obtain AdSense approval, publish `ads.txt`, configure a Google-certified CMP, create ad units, review placements, obtain explicit activation authorization, then enable ads.

If a later step was completed early, record the exception in `PROGRESS.md` and restore the safest reversible state before continuing.

## Release gates

- Preview builds remain non-indexable.
- No policy page ships without official provenance and a review date.
- No structured comparison value is inferred loosely from prose.
- LLM output may not introduce facts or sources absent from verified input.
- External account operations and public feature activation require explicit authorization.

## Open decisions

- Priority order for the next country batches.
- Exact free-result boundary and paid-report contents.
- Report pricing and whether there will be one or several tiers.
- Whether users prefer web-only delivery or an optional email access link.
