/**
 * Google AdSense configuration contract.
 *
 * AdSense is stricter than a plain ad network, so activation is gated on more
 * than an account existing:
 * - a Google-certified CMP must be recorded before any EEA/UK/Swiss traffic is
 *   served, because a hand-rolled consent banner does not satisfy Google's EU
 *   user consent policy;
 * - `ads.txt` must authorize the publisher account;
 * - only non-intrusive formats are permitted; interstitial, vignette, and
 *   anchor formats stay excluded by configuration, not by convention.
 */
const allowedFormats = new Set(["display-responsive", "in-article"]);
const certifiedCmps = new Set(["google-funding-choices"]);
const publisherPattern = /^ca-pub-\d{16}$/;
const slotPattern = /^\d{10}$/;
const placements = ["content", "results"];

export function isAdSlotId(value) {
  return slotPattern.test(value ?? "");
}

/** The IAB record that authorizes Google to sell this site's inventory. */
export function adsTxtRecord(publisherId) {
  if (!publisherPattern.test(publisherId ?? "")) return null;
  return `google.com, ${publisherId.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0`;
}

export function validateAdvertisingConfig(config) {
  if (!config || config.provider !== "google-adsense") return ["advertising.provider must be google-adsense"];
  const errors = [];
  const formats = config.allowedFormats ?? [];
  if (!formats.length || formats.some((format) => !allowedFormats.has(format))) {
    errors.push("advertising.allowedFormats may contain only display-responsive and in-article");
  }
  if (!config.enabled) return errors;
  if (!publisherPattern.test(config.publisherId ?? "")) {
    errors.push("advertising.publisherId must match ca-pub- followed by 16 digits");
  }
  if (!config.consentReady) errors.push("advertising.consentReady must be true before activation");
  if (!config.cmp?.certified || !certifiedCmps.has(config.cmp?.provider)) {
    errors.push("advertising.cmp must record a Google-certified consent management platform");
  }
  if (!config.integrationReady) {
    errors.push("advertising.integrationReady must be true after ads.txt, slots, and placements are reviewed");
  }
  for (const placement of placements) {
    if (!isAdSlotId(config.slots?.[placement])) {
      errors.push(`advertising.slots.${placement} must be a 10-digit ad slot ID`);
    }
  }
  return errors;
}

export function isAdvertisingActive(config, isProduction) {
  return Boolean(isProduction && config?.enabled && validateAdvertisingConfig(config).length === 0);
}
