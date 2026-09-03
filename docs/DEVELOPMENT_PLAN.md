# Immigration Pathways development plan

## Product sequence

1. Build a verified immigration-policy directory with official sources.
2. Add deterministic filtering and side-by-side comparison.
3. Add LLM-written reports grounded only in verified structured data.
4. Add payment and email delivery only after the report has been validated.

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

### M4 — Grounded report prototype

- Serverless Cloudflare Worker endpoint
- Rule-engine results supplied as structured input
- LLM restricted to verified facts and allowed source URLs
- Structured output validation, rate limits, and graceful fallback
- Internal testing before public access

### M5 — Paid delivery

Requires explicit owner authorization before implementation.

- Payment provider and webhook
- D1 report record and unguessable access token
- Immediate web report with print/download support
- Optional transactional email containing an access link
- Refund, retention, deletion, privacy, and support policies

## Release gates

- Preview remains non-indexable.
- No policy page ships without official provenance and a review date.
- No comparison field is inferred from prose when a structured value is required.
- LLM output cannot add facts or sources that are absent from verified input.
- Production domain, indexing, analytics, payment, and email require owner approval.
