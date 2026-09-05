import { readdirSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./site.config.mjs";

const isProduction = process.env.SITE_BUILD_MODE === "production";

/**
 * Country records whose coverage is `directory` are a summary plus a government
 * link. They render with `noindex`, so they must stay out of the sitemap too:
 * submitting a non-indexable URL is a Search Console error and, for AdSense
 * review, reads as scaled low-value content.
 */
const directoryCountryIds = readdirSync("./src/data/countries")
  .filter((file) => file.endsWith(".json"))
  .filter((file) => JSON.parse(readFileSync(`./src/data/countries/${file}`, "utf8")).coverage === "directory")
  .map((file) => file.replace(/\.json$/, ""));

const directoryPaths = new Set(
  directoryCountryIds.flatMap((id) => [`/countries/${id}`, `/zh/countries/${id}`]),
);

const isIndexablePage = (page) => {
  const path = new URL(page).pathname.replace(/\/$/, "");
  return path !== "/404" && !directoryPaths.has(path);
};

export default defineConfig({
  output: "static",
  site: site.url,
  trailingSlash: "never",
  integrations: isProduction ? [sitemap({ filter: isIndexablePage })] : [],
});
