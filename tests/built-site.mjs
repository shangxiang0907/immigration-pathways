import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("dist");
const read = (path) => readFile(resolve(root, path), "utf8");
const expectedRobots = process.env.EXPECT_INDEXABLE === "true" ? "index, follow" : "noindex, nofollow, noarchive";
const fields = ["age", "education", "experience", "english", "jobOffer", "funds", "regional", "qualification"];
const previewHome = await read("index.html");
assert.doesNotMatch(previewHome, /pagead2\.googlesyndication\.com|adsbygoogle|adsterra|profitableratecpmnetwork|highrevenueformat|data-ad-slot/, "preview must not emit advertising code");
assert.match(previewHome, /<body data-detect-locale="true">/);
assert.match(previewHome, /navigator\.languages\?\.\[0\] \?\? navigator\.language/);
assert.match(previewHome, /preferredLocale !== "zh"/);
assert.match(previewHome, /Reviewed coverage across 33 countries/);
assert.match(previewHome, /Compare 71 reviewed immigration and work-residence pathways/);
assert.doesNotMatch(previewHome, /This preview remains unavailable|Canada now includes three reviewed/);
const previewCountries = await read("countries/index.html");
assert.match(previewCountries, /<body data-detect-locale="false">/);
assert.match(previewCountries, /===1\?`entry`:`entries`/);
assert.doesNotMatch(previewHome, /navigator\.languages\?\.some/);
const previewZhHome = await read("zh/index.html");
assert.match(previewZhHome, /已复核覆盖 33 个国家/);
assert.match(previewZhHome, /比较 71 条经过复核的移民及工作居留路径/);
assert.doesNotMatch(previewZhHome, /预览站不会被搜索引擎索引|加拿大现有三项/);
const previewPrivacy = await read("privacy/index.html");
assert.match(previewPrivacy, /Google AdSense is the selected advertising provider/);
assert.match(previewPrivacy, /Google-certified consent management platform/);
assert.match(previewPrivacy, /policies\.google\.com\/technologies\/partner-sites/);
const previewZhPrivacy = await read("zh/privacy/index.html");
assert.match(previewZhPrivacy, /Google AdSense 作为广告服务商/);
assert.match(previewZhPrivacy, /经 Google 认证的同意管理平台/);

// ads.txt authorizes no seller until a publisher ID is configured.
const adsTxt = await read("ads.txt");
assert.doesNotMatch(adsTxt, /pub-\d/);
assert.match(adsTxt, /No advertising seller is authorized/);

// Directory-only country records carry no reviewed content of our own. They stay
// non-indexable in every build mode and never render an ad placement.
for (const path of ["countries/afghanistan/index.html", "zh/countries/afghanistan/index.html"]) {
  const html = await read(path);
  assert.match(html, /<meta name="robots" content="noindex, nofollow, noarchive">/, `${path} must stay non-indexable`);
  assert.doesNotMatch(html, /ad-placement|adsbygoogle/, `${path} must not render an ad placement`);
}
// Deep-coverage records render the full structure in both locales, including the
// figures, the period each figure applies to, and the published source conflicts.
for (const [path, headings, label] of [
  ["countries/germany/index.html", ["How the system works", "Key requirements and figures", "What commonly blocks an application", "Where official sources disagree"], "Deep coverage"],
  ["zh/countries/germany/index.html", ["办理流程", "关键要求与数字", "常见的不符合原因", "官方来源分歧"], "深度覆盖"],
]) {
  const html = await read(path);
  for (const heading of headings) assert.ok(html.includes(heading), `${path} must render "${heading}"`);
  assert.match(html, new RegExp(`status status-deep">${label}`), `${path} must show the deep coverage label`);
  assert.ok(html.includes("50,700"), `${path} must render the dated Blue Card threshold`);
  assert.match(html, /class="fact-table"/, `${path} must render the sourced figure table`);
  assert.match(html, /<div class="table-scroll">/, `${path} must keep the wide table scrollable`);
  assert.ok(html.includes("arbeitsagentur.de"), `${path} must attribute the figure to its authority`);
}
// Canada is deep as well, and having no documented conflicts it must omit that
// section rather than render an empty heading.
for (const [path, heading, conflicts] of [
  ["countries/canada/index.html", "How the system works", "Where official sources disagree"],
  ["zh/countries/canada/index.html", "办理流程", "官方来源分歧"],
]) {
  const html = await read(path);
  assert.ok(html.includes(heading), `${path} must render deep-coverage sections`);
  assert.ok(!html.includes(conflicts), `${path} must omit the conflicts section when there are none`);
  assert.match(html, /class="fact-table"/, `${path} must render the sourced figure table`);
}

// Records below deep coverage must not render deep structure.
for (const path of ["countries/australia/index.html", "countries/afghanistan/index.html"]) {
  assert.doesNotMatch(await read(path), /step-list|fact-table/, `${path} must not render deep-coverage sections`);
}

// Reviewed country records follow the build's indexing mode.
for (const path of ["countries/germany/index.html", "zh/countries/germany/index.html"]) {
  assert.match(await read(path), new RegExp(`<meta name="robots" content="${expectedRobots}">`), `${path} must follow the build mode`);
}

for (const [path, language, heading] of [["match/index.html", "en-US", "Fill once, compare countries"], ["zh/match/index.html", "zh-CN", "一次填写，比较多个国家"]]) {
  const html = await read(path);
  assert.match(html, new RegExp(`<html lang="${language}"`));
  assert.match(html, new RegExp(`<h1>${heading}</h1>`));
  assert.match(html, new RegExp(`<meta name="robots" content="${expectedRobots}">`));
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
