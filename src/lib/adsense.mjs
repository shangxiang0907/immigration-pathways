const publisherPattern = /^ca-pub-\d{16}$/;
const slotPattern = /^\d{10}$/;

export function validateAdvertisingConfig(config) {
  if (!config || config.provider !== "google-adsense") return ["advertising.provider must be google-adsense"];
  if (!config.enabled) return [];
  const errors = [];
  if (!publisherPattern.test(config.publisherId ?? "")) errors.push("advertising.publisherId must match ca-pub- followed by 16 digits");
  if (!config.consentReady) errors.push("advertising.consentReady must be true before activation");
  for (const placement of ["content", "results"]) {
    if (!slotPattern.test(config.slots?.[placement] ?? "")) errors.push(`advertising.slots.${placement} must be a 10-digit ad slot ID`);
  }
  return errors;
}

export function isAdvertisingActive(config, isProduction) {
  return Boolean(isProduction && config?.enabled && validateAdvertisingConfig(config).length === 0);
}

export function isAdSlotId(value) {
  return slotPattern.test(value ?? "");
}
