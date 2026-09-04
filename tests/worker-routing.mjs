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
const strictRequest = new Request("https://pathwaystoabroad.com/api/ad-policy");
Object.defineProperty(strictRequest, "cf", { value: { country: "DE" } });
const strictPolicy = await worker.fetch(strictRequest, { ASSETS: assets });
assert.deepEqual(await strictPolicy.json(), { consentRequired: true });
assert.equal(strictPolicy.headers.get("cache-control"), "private, no-store");

const directRequest = new Request("https://pathwaystoabroad.com/api/ad-policy");
Object.defineProperty(directRequest, "cf", { value: { country: "TH" } });
const directPolicy = await worker.fetch(directRequest, { ASSETS: assets });
assert.deepEqual(await directPolicy.json(), { consentRequired: false });

const unknownRequest = new Request("https://pathwaystoabroad.com/api/ad-policy");
const unknownPolicy = await worker.fetch(unknownRequest, { ASSETS: assets });
assert.deepEqual(await unknownPolicy.json(), { consentRequired: true });

console.log("worker routing tests passed");
