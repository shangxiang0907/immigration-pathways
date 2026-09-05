import type { APIRoute } from "astro";
import { site } from "../../site.config.mjs";
import { adsTxtRecord } from "../lib/advertising.mjs";

/**
 * AdSense only serves inventory that ads.txt authorizes. The record appears as
 * soon as a valid publisher ID is configured; until then the file deliberately
 * authorizes no seller.
 */
export const GET: APIRoute = () => {
  const record = adsTxtRecord(site.advertising.publisherId);
  const body = record
    ? `${record}\n`
    : "# No advertising seller is authorized for this site yet.\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
