import fs from "node:fs";

const ENV_PATH = ".env.traffic.local";
const API_BASE = "https://api3.adsterratools.com/publisher";
const DEFAULT_DOMAIN = "pathwaystoabroad.com";

function loadLocalEnv(path) {
  if (!fs.existsSync(path)) {
    throw new Error(`Missing ${path}. Copy .env.traffic.example and add the API token.`);
  }

  for (const line of fs.readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!match || match[1] in process.env) continue;
    let value = match[2];
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

function parseDays(args) {
  const index = args.indexOf("--days");
  const value = index === -1 ? 7 : Number(args[index + 1]);
  if (!Number.isInteger(value) || value < 1 || value > 366) {
    throw new Error("--days must be an integer from 1 to 366.");
  }
  return value;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

async function apiGet(path, token, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, { headers: { "X-API-Key": token } });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Adsterra returned HTTP ${response.status} with an invalid response.`);
  }
  if (!response.ok) {
    throw new Error(`Adsterra returned HTTP ${response.status}: ${data.message ?? "Unknown error"}`);
  }
  return data;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

async function main() {
  loadLocalEnv(ENV_PATH);
  const token = process.env.ADSTERRA_API_TOKEN?.trim();
  if (!token) throw new Error(`ADSTERRA_API_TOKEN is missing from ${ENV_PATH}.`);

  const days = parseDays(process.argv.slice(2));
  const finish = new Date();
  const start = new Date(finish);
  start.setUTCDate(start.getUTCDate() - days + 1);

  const domainName = process.env.ADSTERRA_DOMAIN?.trim() || DEFAULT_DOMAIN;
  const domains = await apiGet("/domains.json", token);
  const domain = domains.items?.find((item) => item.title === domainName);
  if (!domain) throw new Error(`Domain ${domainName} was not found in the Adsterra account.`);

  const statistics = await apiGet("/stats.json", token, {
    domain: String(domain.id),
    start_date: isoDate(start),
    finish_date: isoDate(finish),
    group_by: "date",
  });
  const rows = statistics.items ?? [];
  const totals = rows.reduce(
    (sum, row) => ({
      impressions: sum.impressions + Number(row.impression ?? 0),
      clicks: sum.clicks + Number(row.clicks ?? 0),
      revenue: sum.revenue + Number(row.revenue ?? 0),
    }),
    { impressions: 0, clicks: 0, revenue: 0 },
  );
  const ctr = totals.impressions ? (totals.clicks / totals.impressions) * 100 : 0;
  const cpm = totals.impressions ? (totals.revenue / totals.impressions) * 1000 : 0;

  console.log(`Adsterra — ${domainName}`);
  console.log(`${isoDate(start)} to ${isoDate(finish)} (${days} days)`);
  console.log(`Impressions: ${formatNumber(totals.impressions)}`);
  console.log(`Clicks:      ${formatNumber(totals.clicks)}`);
  console.log(`CTR:         ${ctr.toFixed(2)}%`);
  console.log(`CPM:         $${cpm.toFixed(3)}`);
  console.log(`Revenue:     $${totals.revenue.toFixed(3)}`);
  if (statistics.dbLastUpdateTime) console.log(`Data updated: ${statistics.dbLastUpdateTime}`);
}

main().catch((error) => {
  console.error(`Adsterra report failed: ${error.message}`);
  process.exitCode = 1;
});
