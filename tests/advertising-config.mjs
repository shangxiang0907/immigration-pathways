import assert from "node:assert/strict";
import { isAdvertisingActive, validateAdvertisingConfig } from "../src/lib/advertising.mjs";

const valid = {
  provider: "adsterra", enabled: true, consentReady: true, integrationReady: true,
  allowedFormats: ["native-banner", "display-banner"],
  placements: {
    native: { scriptUrl: "https://pl31189426.profitableratecpmnetwork.com/c7533d92fabd0a50f3b95905edae43e8/invoke.js", containerId: "container-c7533d92fabd0a50f3b95905edae43e8" },
    mobile: { scriptUrl: "https://www.highrevenueformat.com/8175f7a86e3c4067b6c69640dff0b70f/invoke.js", key: "8175f7a86e3c4067b6c69640dff0b70f", width: 320, height: 50 },
    desktop: { scriptUrl: "https://www.highrevenueformat.com/9084f0b0a63d84094331623d7bc1be97/invoke.js", key: "9084f0b0a63d84094331623d7bc1be97", width: 728, height: 90 },
  },
};
assert.deepEqual(validateAdvertisingConfig({ ...valid, enabled: false, consentReady: false, integrationReady: false }), []);
assert.equal(isAdvertisingActive(valid, false), false);
assert.equal(isAdvertisingActive(valid, true), true);
assert.ok(validateAdvertisingConfig({ ...valid, consentReady: false }).some((error) => error.includes("consentReady")));
assert.ok(validateAdvertisingConfig({ ...valid, integrationReady: false }).some((error) => error.includes("integrationReady")));
assert.ok(validateAdvertisingConfig({ ...valid, allowedFormats: ["popunder"] }).some((error) => error.includes("allowedFormats")));
assert.ok(validateAdvertisingConfig({ ...valid, provider: "google-adsense" }).some((error) => error.includes("provider")));
assert.ok(validateAdvertisingConfig({ ...valid, placements: undefined }).some((error) => error.includes("placements")));
assert.ok(validateAdvertisingConfig({ ...valid, placements: { ...valid.placements, mobile: { ...valid.placements.mobile, scriptUrl: "https://example.com/invoke.js" } } }).some((error) => error.includes("mobile")));
console.log("advertising configuration tests passed");
