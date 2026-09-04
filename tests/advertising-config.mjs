import assert from "node:assert/strict";
import { isAdvertisingActive, validateAdvertisingConfig } from "../src/lib/advertising.mjs";

const valid = { provider: "adsterra", enabled: true, consentReady: true, integrationReady: true, allowedFormats: ["native-banner", "display-banner"] };
assert.deepEqual(validateAdvertisingConfig({ ...valid, enabled: false, consentReady: false, integrationReady: false }), []);
assert.equal(isAdvertisingActive(valid, false), false);
assert.equal(isAdvertisingActive(valid, true), true);
assert.ok(validateAdvertisingConfig({ ...valid, consentReady: false }).some((error) => error.includes("consentReady")));
assert.ok(validateAdvertisingConfig({ ...valid, integrationReady: false }).some((error) => error.includes("integrationReady")));
assert.ok(validateAdvertisingConfig({ ...valid, allowedFormats: ["popunder"] }).some((error) => error.includes("allowedFormats")));
assert.ok(validateAdvertisingConfig({ ...valid, provider: "google-adsense" }).some((error) => error.includes("provider")));
console.log("advertising configuration tests passed");
