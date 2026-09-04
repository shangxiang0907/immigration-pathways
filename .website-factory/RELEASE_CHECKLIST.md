# Release checklist

This sequence is mandatory. A technical ability to perform a later step is not permission to skip an earlier dependency or operate an external account.

## 1. Domain and transport

- [x] Confirm apex and `www` behavior, canonical host, HTTPS, redirects, and live 404 handling.

## 2. Contact and legal surfaces

- [x] Configure a public contact address or forwarding route.
- [x] Send and receive a real test message.
- [x] Put the working address on the contact/privacy surfaces.
- [x] Verify privacy, terms, disclaimer, support expectations, and data-handling descriptions.

## 3. Google Search Console

- [ ] Obtain explicit owner authorization for account-side configuration.
- [ ] Add and verify the correct production property.
- [ ] Record the verified property and date in `PROGRESS.md` without storing credentials.

## 4. Sitemap

- [x] Use the safe production build, which emits canonical URLs and a sitemap while retaining `noindex` and `Disallow: /`.
- [x] Confirm the production sitemap is reachable and contains canonical public URLs only.
- [ ] Submit it in Search Console and confirm it is accepted.

## 5. Live quality review

- [ ] Test representative mobile and desktop widths in real browsers.
- [ ] Check both locales, navigation, directory search, unified questionnaire, results, official links, privacy controls, and 404 behavior.
- [ ] Resolve release blockers and rerun `npm run check` and `npm run build`.

## 6. Indexing

- [ ] Confirm steps 1–5 are complete in `PROGRESS.md`.
- [ ] Obtain explicit owner authorization to enable indexing.
- [ ] Deploy indexable robots/meta output and verify the live response.

## 7. Advertising (separate activation)

- [ ] Confirm applicable consent requirements and configure the approved consent mechanism.
- [ ] Obtain explicit authorization for AdSense account connection/configuration.
- [ ] Configure real publisher/slot identifiers without committing secrets.
- [ ] Review ad placement on free surfaces; exclude paid reports and checkout.
- [ ] Obtain explicit authorization to activate production ads.
- [ ] Deploy and verify that ads do not load on previews or disabled builds.

## Rollback rule

If a later step was performed before its prerequisites, restore the safest reversible state (normally non-indexable and advertising-disabled), document the exception in `PROGRESS.md`, and resume from the first incomplete gate.
