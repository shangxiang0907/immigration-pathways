import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

/**
 * Provenance rules from .website-factory/CONTENT_GUIDELINES.md, enforced against
 * the country data itself so they hold without running an Astro build.
 */
const dir = "./src/data/countries";
const isoDate = /^\d{4}-\d{2}-\d{2}$/;
// Review dates are recorded in the reviewer's local time, which can be a day
// ahead of UTC, so allow exactly that much skew and no more.
const latestAllowed = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const requireHttps = (url, at) => {
  assert.ok(url.startsWith("https://"), `${at}: source URLs must be https, got ${url}`);
};
const requireBilingual = (record, base, at) => {
  assert.ok(record[base]?.length, `${at}: missing ${base}`);
  assert.ok(record[`${base}En`]?.length, `${at}: missing ${base}En`);
};
const requireReviewDate = (value, at) => {
  assert.match(value ?? "", isoDate, `${at}: reviewedAt must use YYYY-MM-DD`);
  assert.ok(value <= latestAllowed, `${at}: reviewedAt ${value} is in the future`);
};

let deepCount = 0;
const files = readdirSync(dir).filter((file) => file.endsWith(".json"));
assert.ok(files.length > 0, "no country records found");

for (const file of files) {
  const at = `countries/${file}`;
  const country = JSON.parse(readFileSync(`${dir}/${file}`, "utf8"));

  requireBilingual(country, "name", at);
  requireBilingual(country, "summary", at);
  requireReviewDate(country.reviewedAt, at);
  assert.ok(country.sources?.length, `${at}: at least one official source is required`);
  for (const source of country.sources) {
    requireHttps(source.url, at);
    requireReviewDate(source.reviewedAt, `${at} source ${source.url}`);
  }

  // The coverage label is a promise about depth, so it must match the data.
  const deep = country.deepCoverage;
  assert.equal(
    Boolean(deep), country.coverage === "deep",
    `${at}: coverage '${country.coverage}' does not match the presence of deepCoverage`,
  );
  if (!deep) continue;
  deepCount += 1;

  requireBilingual(deep, "scope", at);
  assert.ok(deep.steps?.length, `${at}: deep coverage needs ordered steps`);
  assert.ok(deep.keyFacts?.length, `${at}: deep coverage needs key facts`);
  assert.ok(deep.blockers?.length, `${at}: deep coverage needs common blockers`);

  for (const [index, step] of deep.steps.entries()) {
    const stepAt = `${at} steps[${index}]`;
    requireBilingual(step, "title", stepAt);
    requireBilingual(step, "body", stepAt);
    assert.ok(step.sourceUrls?.length, `${stepAt}: every step needs a source`);
    step.sourceUrls.forEach((url) => requireHttps(url, stepAt));
  }

  // Every consequential number must say which period it applies to, so a stale
  // figure is visible to the reader rather than silently wrong.
  for (const [index, fact] of deep.keyFacts.entries()) {
    const factAt = `${at} keyFacts[${index}]`;
    requireBilingual(fact, "label", factAt);
    requireBilingual(fact, "value", factAt);
    assert.ok(fact.appliesTo?.length, `${factAt}: a figure must state the period it applies to`);
    requireHttps(fact.sourceUrl ?? "", factAt);
    requireReviewDate(fact.reviewedAt, factAt);
  }

  for (const [index, blocker] of deep.blockers.entries()) {
    const blockerAt = `${at} blockers[${index}]`;
    requireBilingual(blocker, "summary", blockerAt);
    assert.ok(blocker.sourceUrls?.length, `${blockerAt}: every blocker needs a source`);
    blocker.sourceUrls.forEach((url) => requireHttps(url, blockerAt));
  }

  // A documented conflict is only meaningful with the sources that disagree.
  for (const [index, conflict] of (deep.sourceConflicts ?? []).entries()) {
    const conflictAt = `${at} sourceConflicts[${index}]`;
    requireBilingual(conflict, "summary", conflictAt);
    assert.ok(conflict.sourceUrls?.length >= 2, `${conflictAt}: a conflict needs at least two sources`);
    conflict.sourceUrls.forEach((url) => requireHttps(url, conflictAt));
  }
}

assert.ok(deepCount > 0, "expected at least one deep-coverage country record");
console.log(`country record provenance tests passed (${files.length} records, ${deepCount} deep)`);
