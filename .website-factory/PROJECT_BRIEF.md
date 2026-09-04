# Project brief

## Identity

- Product name: Immigration Pathways
- Public URL: <https://pathwaystoabroad.com>
- Default locale: English (`en-US`, root URLs)
- Additional locale: Simplified Chinese (`zh-CN`, `/zh/`)
- Source of truth: `site.config.mjs`

## Audience and problem

The site serves people who are unfamiliar with immigration systems or do not want to research many government sites. They should be able to enter shared information once, receive a conservative shortlist of relevant countries and pathways, compare the result, and continue to the responsible government source.

The product is an educational discovery tool, not an application platform, approval predictor, immigration adviser, or law firm.

## Core product

- A searchable country and immigration-program directory with official links.
- Reviewed, dated summaries of principal pathways.
- One short browser-only questionnaire for all supported countries.
- Deterministic `pass`, `fail`, and `unknown` evaluation with visible reasons.
- Optional, opt-in local profile caching with a clear delete control.
- Useful free results; no paywall around public official links.

## Current scope

- 33 countries, 71 program records, and unified matching for reviewed programs.
- Static Astro output deployed through Cloudflare Workers Static Assets.
- Advertising integration exists in code but remains disabled.
- LLM reports, checkout, accounts, payment, and report delivery are deferred.

## Business model

The intended model combines unobtrusive advertising on free information/results surfaces with a later low-priced, ad-free in-depth report. A paid report must add organization and explanation grounded in verified structured data; it must not merely resell public links.

## Product decisions

- Keep the site lightweight and static-first.
- Add a backend only when generation, payment, or delivery requires one.
- Provide an immediate web report if paid reports are validated; email is optional and may later send an access link.
- Default to English. Do not infer language from IP address, nationality, or conversation language.
- Do not begin LLM report work until the static site has been released, observed, and its proposition validated.

## External actions requiring owner authorization

Publication, DNS changes, analytics, advertising activation, consent-provider configuration, indexing, payments, checkout, user accounts, transactional email, and report delivery.
