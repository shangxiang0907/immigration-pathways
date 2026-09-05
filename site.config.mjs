export const site = {
  name: "Immigration Pathways",
  description: "Find immigration policies, official sources, and reviewed eligibility information by country.",
  url: "https://pathwaystoabroad.com",
  contactEmail: "contact@pathwaystoabroad.com",
  defaultLocale: "en",
  advertising: {
    provider: "google-adsense",
    // Ads stay off until every AdSense gate below is satisfied and the owner
    // authorizes activation. See .website-factory/RELEASE_CHECKLIST.md gate 7.
    enabled: false,
    // ca-pub- followed by 16 digits, from the approved AdSense account.
    publisherId: "",
    // A Google-certified CMP must be live before serving EEA/UK/Swiss traffic.
    consentReady: false,
    cmp: { certified: false, provider: "" },
    // True only after ads.txt is live, ad units exist, and placements are reviewed.
    integrationReady: false,
    // Policy allowlist. Interstitial, vignette, anchor, and auto-ads formats stay excluded.
    allowedFormats: ["display-responsive"],
    // 10-digit ad unit IDs created in the AdSense console.
    slots: { content: "", results: "" },
  },
  locales: {
    en: {
      htmlLang: "en-US",
      label: "English",
      pathPrefix: "",
      navigation: [
        { href: "/", label: "Home" },
        { href: "/countries", label: "Countries" },
        { href: "/programs", label: "Programs" },
        { href: "/match", label: "Check options" },
        { href: "/about", label: "About" },
      ],
    },
    zh: {
      htmlLang: "zh-CN",
      label: "中文",
      pathPrefix: "/zh",
      navigation: [
        { href: "/zh/", label: "首页" },
        { href: "/zh/countries", label: "国家" },
        { href: "/zh/programs", label: "移民项目" },
        { href: "/zh/match", label: "条件预筛" },
        { href: "/zh/about", label: "关于" },
      ],
    },
  },
};
