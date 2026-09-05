import assert from "node:assert/strict";

import worker from "../src/worker.mjs";

const assets = {
  fetch(request) {
    return new Response(new URL(request.url).pathname, { status: 200 });
  },
};

for (const testCase of [
  {
    url: "https://pathwaystoabroad.com/countries/canada?source=test",
    status: 200,
    body: "/countries/canada",
  },
  {
    url: "https://www.pathwaystoabroad.com/zh/match?source=test",
    status: 301,
    location: "https://pathwaystoabroad.com/zh/match?source=test",
  },
  {
    url: "http://www.pathwaystoabroad.com/programs",
    status: 301,
    location: "https://pathwaystoabroad.com/programs",
  },
]) {
  const response = await worker.fetch(new Request(testCase.url), { ASSETS: assets });
  assert.equal(response.status, testCase.status, testCase.url);
  if (testCase.location) {
    assert.equal(response.headers.get("location"), testCase.location, testCase.url);
  } else {
    assert.equal(await response.text(), testCase.body, testCase.url);
  }
}

assert.equal(worker.fetch !== undefined, true);

// The Adsterra-era regional consent endpoint is gone. AdSense relies on a
// Google-certified CMP, so nothing about consent is decided at the edge and the
// former route must fall through to static assets like any other path.
const retiredPolicy = await worker.fetch(
  new Request("https://pathwaystoabroad.com/api/ad-policy"),
  { ASSETS: assets },
);
assert.equal(retiredPolicy.status, 200);
assert.equal(await retiredPolicy.text(), "/api/ad-policy");

console.log("worker routing tests passed");
