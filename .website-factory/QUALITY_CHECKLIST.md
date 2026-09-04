# Quality checklist

Run this checklist after each coherent content batch and before a release. Record changing release status in `PROGRESS.md`; do not mark an item complete without evidence.

## Build and data

- [ ] `npm run check` passes.
- [ ] `npm run build` passes.
- [ ] Schema, registry, and matching contract tests pass.
- [ ] No broken internal links or unexpected routes are introduced.
- [ ] Preview output remains non-indexable.

## Immigration content

- [ ] Every consequential fact has an authoritative government source.
- [ ] Every published record has a review date and explicit coverage level.
- [ ] Fees, quotas, deadlines, eligibility, and processing rules were rechecked.
- [ ] `unknown` is used when structured evidence is insufficient.
- [ ] No copy predicts approval or presents personalized legal advice.
- [ ] English and Chinese versions preserve the same meaning and limitations.

## Matching and privacy

- [ ] New rules use the shared profile and generic evaluator.
- [ ] Boundary cases cover pass, fail, unknown, and missing input.
- [ ] No country-specific primary questionnaire or duplicate engine was added.
- [ ] Profile persistence remains opt-in, browser-only, versioned, and clearable.
- [ ] No personal questionnaire data is uploaded by static-site code.

## SEO and release safety

- [ ] Canonical, `hreflang`, metadata, robots, sitemap, and 404 behavior are correct for the intended build mode.
- [ ] Real mobile and desktop browsers were checked for navigation, forms, results, overflow, and language switching.
- [ ] `RELEASE_CHECKLIST.md` gates are complete in order.
- [ ] Advertising remains disabled unless consent, account, placement, and authorization gates are complete.

## Handoff

- [ ] `PROGRESS.md` reflects completed work, blockers, and the next action.
- [ ] Relevant files were reviewed with `git diff` and no unrelated changes were included.
