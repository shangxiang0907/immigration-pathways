const allowedFormats = new Set(["native-banner", "display-banner"]);
const allowedHosts = new Set(["pl31189426.profitableratecpmnetwork.com", "www.highrevenueformat.com"]);

function isApprovedScriptUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && allowedHosts.has(url.hostname) && url.pathname.endsWith("/invoke.js");
  } catch {
    return false;
  }
}

export function validateAdvertisingConfig(config) {
  if (!config || config.provider !== "adsterra") return ["advertising.provider must be adsterra"];
  const errors = [];
  const formats = config.allowedFormats ?? [];
  if (!formats.length || formats.some((format) => !allowedFormats.has(format))) {
    errors.push("advertising.allowedFormats may contain only native-banner and display-banner");
  }
  if (!config.enabled) return errors;
  if (!config.consentReady) errors.push("advertising.consentReady must be true before activation");
  if (!config.integrationReady) errors.push("advertising.integrationReady must be true after generated code and placements are reviewed");
  if (config.consentMode !== "regional" || config.policyEndpoint !== "/api/ad-policy") {
    errors.push("advertising regional consent policy is invalid");
  }
  const { native, mobile, desktop } = config.placements ?? {};
  if (!native || !mobile || !desktop) {
    errors.push("advertising.placements must include native, mobile, and desktop placements");
    return errors;
  }
  if (!isApprovedScriptUrl(native.scriptUrl) || !/^container-[a-f0-9]{32}$/.test(native.containerId ?? "")) {
    errors.push("advertising.placements.native is invalid");
  }
  for (const [name, placement, expected] of [["mobile", mobile, [320, 50]], ["desktop", desktop, [728, 90]]]) {
    if (!isApprovedScriptUrl(placement.scriptUrl) || !/^[a-f0-9]{32}$/.test(placement.key ?? "") || placement.width !== expected[0] || placement.height !== expected[1]) {
      errors.push(`advertising.placements.${name} is invalid`);
    }
  }
  return errors;
}

export function isAdvertisingActive(config, isProduction) {
  return Boolean(isProduction && config?.enabled && validateAdvertisingConfig(config).length === 0);
}
