import assert from "node:assert/strict";
import { adsTxtRecord, isAdSlotId, isAdvertisingActive, validateAdvertisingConfig } from "../src/lib/advertising.mjs";

const valid = {
  provider: "google-adsense", enabled: true, publisherId: "ca-pub-1234567890123456",
  consentReady: true, cmp: { certified: true, provider: "google-funding-choices" },
  integrationReady: true, allowedFormats: ["display-responsive"],
  slots: { content: "1234567890", results: "0987654321" },
};

// The shipped disabled configuration must stay valid so builds keep passing.
assert.deepEqual(validateAdvertisingConfig({ provider: "google-adsense", enabled: false, allowedFormats: ["display-responsive"] }), []);
assert.deepEqual(validateAdvertisingConfig(valid), []);
assert.equal(isAdvertisingActive(valid, false), false, "preview builds never serve ads");
assert.equal(isAdvertisingActive(valid, true), true);
assert.equal(isAdvertisingActive({ ...valid, enabled: false }, true), false);

assert.ok(validateAdvertisingConfig({ ...valid, provider: "adsterra" }).some((error) => error.includes("provider")));
assert.ok(validateAdvertisingConfig({ ...valid, publisherId: "pub-1234567890123456" }).some((error) => error.includes("publisherId")));
assert.ok(validateAdvertisingConfig({ ...valid, consentReady: false }).some((error) => error.includes("consentReady")));
assert.ok(validateAdvertisingConfig({ ...valid, integrationReady: false }).some((error) => error.includes("integrationReady")));
assert.ok(validateAdvertisingConfig({ ...valid, allowedFormats: ["interstitial"] }).some((error) => error.includes("allowedFormats")));
assert.ok(validateAdvertisingConfig({ ...valid, slots: { content: "123", results: "0987654321" } }).some((error) => error.includes("slots.content")));

// A self-declared consent banner is not a Google-certified CMP.
assert.ok(validateAdvertisingConfig({ ...valid, cmp: { certified: true, provider: "in-house" } }).some((error) => error.includes("certified")));
assert.ok(validateAdvertisingConfig({ ...valid, cmp: { certified: false, provider: "google-funding-choices" } }).some((error) => error.includes("certified")));

assert.equal(isAdSlotId("1234567890"), true);
assert.equal(isAdSlotId("12345"), false);
assert.equal(adsTxtRecord("ca-pub-1234567890123456"), "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0");
assert.equal(adsTxtRecord(""), null);

console.log("advertising configuration tests passed");
