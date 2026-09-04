import type { APIRoute } from "astro";
import { site } from "../../site.config.mjs";

export const GET: APIRoute = () => {
  const indexingEnabled = import.meta.env.SITE_INDEXING_ENABLED === "true";
  const body = indexingEnabled
    ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap-index.xml\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
