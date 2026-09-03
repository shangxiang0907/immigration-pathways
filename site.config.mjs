export const site = {
  name: "Immigration Pathways",
  description: "Find immigration policies, official sources, and reviewed eligibility information by country.",
  url: "https://example.com",
  defaultLocale: "en",
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
