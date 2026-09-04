# Immigration Pathways

A multilingual immigration information platform for comparing country requirements and delivering in-depth reports.

## Setup

```bash
npm install
npm run dev
```

## Verify

```bash
npm run check
npm run build
```

Preview builds emit `noindex, nofollow`. A production build adds canonical URLs and a sitemap but remains non-indexable, so Search Console and live QA can be completed safely:

```bash
npm run build:production
```

Building does not deploy. The safe default Cloudflare deployment also remains non-indexable:

```bash
npm run deploy:cloudflare
```

Only after release gates 1–5 in `.website-factory/RELEASE_CHECKLIST.md` pass and indexing is explicitly approved, deploy indexable output with:

```bash
npm run deploy:indexable
```

The Worker serves the generated static assets on the apex domain and redirects HTTP and `www` requests to the canonical HTTPS origin.
