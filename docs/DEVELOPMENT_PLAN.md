# Immigration Pathways development plan

## Product principles

- Serve people who do not know immigration systems well or do not want to research many government sites themselves.
- Keep the product lightweight: a static information site plus one short browser-based comparison flow, not an application-management platform.
- Ask for shared information once. Do not create a separate questionnaire for every country.
- Return a quick, conservative shortlist of countries and reviewed pathways, with official links and clear missing-information notes.
- Show a useful free preliminary result. A more complete, low-priced report may be offered later, but its price and scope must be validated before implementation.
- Prefer simple static and browser-only features. Add a backend only when report generation, payment, or delivery genuinely requires one.
- Focus development on verified country data, matching quality, official-source links, and the report proposition. Defer nonessential polish and infrastructure.

## Revenue model

- Use two complementary revenue streams: advertising on useful free information and comparison pages, plus low-priced paid in-depth reports.
- Advertising is not a substitute for paid reports, and paid reports are not expected to replace free-site advertising.
- Keep the free result genuinely useful: show a preliminary shortlist, reviewed pathway summaries, uncertainty, and official links without payment.
- Reserve the paid report for deeper organization and explanation based on the user's saved answers and verified structured data; do not sell access to links that are already public.
- Keep paid report views free of advertising. Ads must not interrupt the questionnaire, obscure official sources, imitate navigation, or create pressure through misleading placement.
- Measure the two streams separately: free-page engagement and advertising yield versus report funnel conversion, refunds, and report-generation cost.

## Product sequence

1. Build a verified immigration-policy directory with official sources.
2. Add deterministic filtering and side-by-side comparison.
3. Add configurable Google AdSense support after the planned country coverage is in place.
4. Add LLM-written reports grounded only in verified structured data.
5. Add payment and email delivery only after the report has been validated.

Email is optional, not a default requirement. A paid report should be available immediately on the web; email may later send an access link if owner research shows users want it.

## Language behavior

- English (`en-US`) is the default language and uses root URLs.
- Chinese (`zh-CN`) uses `/zh/` URLs.
- A first-time visitor whose browser prefers Chinese may be redirected to Chinese.
- An explicit language choice overrides browser detection and is remembered locally.
- Language is never inferred from IP address, nationality, or conversation language.
- Localized pages must emit matching `lang`, canonical, and `hreflang` metadata before publication.

## Content coverage

- **Deep:** complete, reviewed program coverage for a small launch group.
- **Overview:** principal pathways and official entry points.
- **Directory:** official authority links only; no implied policy coverage.

Every factual policy record must keep its official source URL, review date, and
coverage status. Fees, quotas, eligibility rules, processing times, and deadlines
must be rechecked against the responsible government authority before publication.

## Milestones

### M1 — Information foundation

- Country and program content schemas
- Country and program directories
- Search and category filters
- Country and program detail templates
- Source, review-date, and coverage indicators
- Build-time validation

### M2 — Verified content batches

- Approve countries in small batches
- Enable the program collection and add records only after the first batch is approved
- Research only authoritative government sources
- Record field-level provenance and review dates
- Run content and site quality review after every coherent batch

### M3 — Comparison and matching

- Comparable normalized policy fields
- Side-by-side program comparison
- Questionnaire with minimal personal data
- Deterministic `pass`, `fail`, and `unknown` outcomes
- No approval prediction or personalized legal advice

### Matching architecture for 100+ countries

- One versioned applicant-profile schema shared by every country
- Declarative program rules stored as data, not country-specific UI code
- One generic evaluator producing `pass`, `fail`, or `unknown` per requirement
- One short shared questionnaire that compares all covered countries in one submission
- Country-specific facts that cannot be derived safely remain `unknown` and are explained in results; they do not create another questionnaire in the primary flow
- Optional profile persistence is opt-in and browser-only, with a visible clear control
- Country-specific rules may extend internal rule data but must not create standalone UI or another engine
- Field-level source URL, review date, rule version, and dynamic-value expiry

### M4 — Google AdSense support

Owner approved this milestone on 2026-09-03, to start after the planned country-directory expansion and before any LLM work.

- Optional publisher ID and ad-slot settings in site configuration
- Reusable responsive ad component with reserved space to limit layout shift
- Load the AdSense script only when a real publisher ID is configured and the build is explicitly production
- Keep local and preview builds free of third-party advertising requests
- Update privacy and consent behavior before enabling ads where legally required
- Do not create or configure the external AdSense account without the owner's account details and explicit go-live instruction
- Place ads only on free informational and free-result surfaces; exclude paid report and checkout surfaces

### M5 — Grounded report prototype

- Serverless Cloudflare Worker endpoint
- Rule-engine results supplied as structured input
- LLM restricted to verified facts and allowed source URLs
- Structured output validation, rate limits, and graceful fallback
- Internal testing before public access

### M6 — Paid delivery

Requires explicit owner authorization before implementation.

- Payment provider and webhook
- D1 report record and unguessable access token
- Immediate web report with print/download support
- Optional transactional email containing an access link
- Refund, retention, deletion, privacy, and support policies
- Ad-free paid report presentation

## Release gates

- Preview remains non-indexable.
- No policy page ships without official provenance and a review date.
- No comparison field is inferred from prose when a structured value is required.
- LLM output cannot add facts or sources that are absent from verified input.
- Production domain, indexing, analytics, payment, and email require owner approval. AdSense implementation order is approved; actual account connection and production activation remain separate release actions.

## Product decisions still open

- Exact free-result boundary and paid-report contents
- Low-price report tier or tiers
- Whether users prefer immediate web access only or an optional email access link
- Which authoritative country/program batch should be added next
