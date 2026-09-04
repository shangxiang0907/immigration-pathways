export const site = {
  name: "Immigration Pathways",
  description: "Find immigration policies, official sources, and reviewed eligibility information by country.",
  url: "https://pathwaystoabroad.com",
  contactEmail: "contact@pathwaystoabroad.com",
  defaultLocale: "en",
  advertising: {
    provider: "adsterra",
    enabled: true,
    consentReady: true,
    integrationReady: true,
    consentMode: "regional",
    policyEndpoint: "/api/ad-policy",
    allowedFormats: ["native-banner", "display-banner"],
    placements: {
      native: {
        scriptUrl: "https://pl31189426.profitableratecpmnetwork.com/c7533d92fabd0a50f3b95905edae43e8/invoke.js",
        containerId: "container-c7533d92fabd0a50f3b95905edae43e8",
      },
      mobile: {
        scriptUrl: "https://www.highrevenueformat.com/8175f7a86e3c4067b6c69640dff0b70f/invoke.js",
        key: "8175f7a86e3c4067b6c69640dff0b70f",
        width: 320,
        height: 50,
      },
      desktop: {
        scriptUrl: "https://www.highrevenueformat.com/9084f0b0a63d84094331623d7bc1be97/invoke.js",
        key: "9084f0b0a63d84094331623d7bc1be97",
        width: 728,
        height: 90,
      },
    },
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
