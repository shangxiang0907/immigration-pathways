const allowedFormats = new Set(["native-banner", "display-banner"]);

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
  return errors;
}

export function isAdvertisingActive(config, isProduction) {
  return Boolean(isProduction && config?.enabled && validateAdvertisingConfig(config).length === 0);
}
