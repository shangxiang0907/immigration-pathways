import assert from "node:assert/strict";
import { isAdvertisingActive, isAdSlotId, validateAdvertisingConfig } from "../src/lib/adsense.mjs";

const valid = { provider: "google-adsense", enabled: true, consentReady: true, publisherId: "ca-pub-1234567890123456", slots: { content: "1234567890", results: "0987654321" } };
assert.deepEqual(validateAdvertisingConfig({ ...valid, enabled: false }), []);
assert.equal(isAdvertisingActive(valid, false), false);
assert.equal(isAdvertisingActive(valid, true), true);
assert.equal(isAdSlotId("1234567890"), true);
assert.equal(isAdSlotId("123"), false);
assert.ok(validateAdvertisingConfig({ ...valid, consentReady: false }).some((error) => error.includes("consentReady")));
assert.ok(validateAdvertisingConfig({ ...valid, publisherId: "test" }).some((error) => error.includes("publisherId")));
console.log("AdSense configuration tests passed");
