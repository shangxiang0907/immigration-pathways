import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./site.config.mjs";

const isProduction = process.env.SITE_BUILD_MODE === "production";

export default defineConfig({
  output: "static",
  site: site.url,
  trailingSlash: "never",
  integrations: isProduction
    ? [sitemap({ filter: (page) => !page.endsWith("/404") })]
    : [],
});
