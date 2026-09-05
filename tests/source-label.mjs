import assert from "node:assert/strict";
import { sourceLabel } from "../src/lib/source-label.mjs";

// Sources on one record often share a host, so the label must distinguish them.
assert.equal(
  sourceLabel("https://www.arbeitsagentur.de/vor-ort/zav/working-and-living-in-germany/iss-en/issue-03-2026/blue-card"),
  "arbeitsagentur.de/blue-card",
);
assert.notEqual(
  sourceLabel("https://www.arbeitsagentur.de/a/b/blue-card"),
  sourceLabel("https://www.arbeitsagentur.de/a/b/opportunity-card"),
);
// File extensions and the German "-node" suffix are noise.
assert.equal(sourceLabel("https://www.bamf.de/EN/Themen/BlaueKarteEU/blauekarteeu-node.html"), "bamf.de/blauekarteeu");
assert.equal(sourceLabel("https://www.anerkennung-in-deutschland.de/html/en/skilled-workers.php"), "anerkennung-in-deutschland.de/skilled-workers");
// A trailing numeric ID identifies nothing, so fall back to the last real segment.
assert.equal(sourceLabel("https://www.auswaertiges-amt.de/en/faq/02a-what-is-the-blue-card/606754"), "auswaertiges-amt.de/02a-what-is-the-blue-card");
// Degenerate inputs must not throw.
assert.equal(sourceLabel("https://example.com"), "example.com");
assert.equal(sourceLabel("https://example.com/"), "example.com");
assert.equal(sourceLabel("https://example.com/12345"), "example.com");
assert.equal(sourceLabel("not a url"), "not a url");

console.log("source label tests passed");
