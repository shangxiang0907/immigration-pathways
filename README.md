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

Preview builds emit `noindex, nofollow`. After the site is reviewed and publication is explicitly approved, run:

```bash
npm run build:production
```

Production mode emits canonical URLs, an indexable robots directive, and a sitemap based on `site.config.mjs`. Building production output does not deploy it.
