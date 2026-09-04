import { site } from "../site.config.mjs";

const preferredHost = new URL(site.url).hostname;
const PRIOR_CONSENT_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HU", "IE", "IS",
  "IT", "LI", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK", "GB", "CH",
]);

export function requiresAdConsent(country) {
  const code = String(country ?? "").toUpperCase();
  return !/^[A-Z]{2}$/.test(code) || PRIOR_CONSENT_COUNTRIES.has(code);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.protocol !== "https:" || url.hostname === `www.${preferredHost}`) {
      url.protocol = "https:";
      url.hostname = preferredHost;
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/api/ad-policy") {
      return Response.json(
        { consentRequired: requiresAdConsent(request.cf?.country) },
        { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" } },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
