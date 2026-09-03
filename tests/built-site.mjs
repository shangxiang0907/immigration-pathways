import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("dist");
const read = (path) => readFile(resolve(root, path), "utf8");
const fields = ["age", "education", "experience", "english", "jobOffer", "funds", "regional", "qualification"];
const previewHome = await read("index.html");
assert.doesNotMatch(previewHome, /pagead2\.googlesyndication\.com|adsbygoogle|data-ad-placement/, "preview must not emit advertising code");
assert.match(previewHome, /<body data-detect-locale="true">/);
assert.match(previewHome, /navigator\.languages\?\.\[0\] \?\? navigator\.language/);
assert.match(previewHome, /preferredLocale !== "zh"/);
const previewCountries = await read("countries/index.html");
assert.match(previewCountries, /<body data-detect-locale="false">/);
assert.doesNotMatch(previewHome, /navigator\.languages\?\.some/);

for (const [path, language, heading] of [["match/index.html", "en-US", "Fill once, compare countries"], ["zh/match/index.html", "zh-CN", "一次填写，比较多个国家"]]) {
  const html = await read(path);
  assert.match(html, new RegExp(`<html lang="${language}"`));
  assert.match(html, new RegExp(`<h1>${heading}</h1>`));
  assert.match(html, /<meta name="robots" content="noindex, nofollow, noarchive">/);
  for (const field of fields) assert.match(html, new RegExp(`<select name="${field}" required>`), `${path} must include ${field}`);
  assert.match(html, /name="saveProfile" type="checkbox"/);
  assert.match(html, /id="clear-profile"/);
  assert.match(html, /id="unified-results"[^>]+aria-labelledby="unified-results-heading"[^>]+aria-live="polite"/);
  const asset = html.match(/src="(\/_astro\/UnifiedMatcher[^"?]+\.js)"/)?.[1];
  assert.ok(asset, `${path} must load the unified matcher client`);
  const script = await read(asset.slice(1));
  assert.match(script, /immigration-pathways-profile-v2/);
  assert.match(script, /version:2/);
  assert.match(script, /prefers-reduced-motion/);
  assert.doesNotMatch(script, /fetch\(|XMLHttpRequest|sendBeacon/);
}

for (const country of ["australia", "canada", "germany"]) {
  const en = await read(`match/${country}/index.html`); const zh = await read(`zh/match/${country}/index.html`);
  assert.match(en, /content="2;url=\/match"/); assert.match(zh, /content="2;url=\/zh\/match"/);
  assert.match(en, /<meta name="robots" content="noindex">/); assert.match(zh, /<meta name="robots" content="noindex">/);
}
console.log("built unified-flow contract tests passed");
