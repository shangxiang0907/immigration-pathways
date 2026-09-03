import type { APIRoute } from "astro";
import { site } from "../../site.config.mjs";

export const GET: APIRoute = () => {
  const isProduction = import.meta.env.SITE_BUILD_MODE === "production";
  const body = isProduction
    ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap-index.xml\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
