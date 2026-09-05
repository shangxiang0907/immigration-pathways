import fs from "node:fs";

const ENV_PATH = ".env.traffic.local";
const API_BASE = "https://api.cloudflare.com/client/v4";
const DEFAULT_ZONE = "pathwaystoabroad.com";

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

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatBytes(value) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KiB`;
  return `${(value / 1024 ** 2).toFixed(1)} MiB`;
}

async function cloudflareGet(path, token) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    const message = data.errors?.map((error) => error.message).join("; ") || "Unknown error";
    throw new Error(`Cloudflare returned HTTP ${response.status}: ${message}`);
  }
  return data.result;
}

async function graphql(query, variables, token) {
  const response = await fetch(`${API_BASE}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  if (!response.ok || data.errors?.length) {
    const message = data.errors?.map((error) => error.message).join("; ") || "Unknown error";
    throw new Error(`Cloudflare GraphQL returned HTTP ${response.status}: ${message}`);
  }
  return data.data;
}

async function main() {
  loadLocalEnv(ENV_PATH);
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
  if (!token) throw new Error(`CLOUDFLARE_API_TOKEN is missing from ${ENV_PATH}.`);

  const days = parseDays(process.argv.slice(2));
  const zoneName = process.env.CLOUDFLARE_ZONE?.trim() || DEFAULT_ZONE;
  const zones = await cloudflareGet(`/zones?name=${encodeURIComponent(zoneName)}`, token);
  const zone = zones.find((item) => item.name === zoneName);
  if (!zone) throw new Error(`Zone ${zoneName} was not found in the Cloudflare account.`);

  const finish = new Date();
  const start = new Date(finish);
  start.setUTCDate(start.getUTCDate() - days + 1);
  const query = `
    query($zoneTag: string!, $start: Date!, $end: Date!, $limit: uint64!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            limit: $limit
            filter: { date_geq: $start, date_leq: $end }
            orderBy: [date_ASC]
          ) {
            dimensions { date }
            sum { requests pageViews bytes cachedRequests }
            uniq { uniques }
          }
        }
      }
    }
  `;
  const data = await graphql(
    query,
    { zoneTag: zone.id, start: isoDate(start), end: isoDate(finish), limit: days },
    token,
  );
  const rows = data.viewer.zones[0]?.httpRequests1dGroups ?? [];
  const totals = rows.reduce(
    (sum, row) => ({
      requests: sum.requests + Number(row.sum.requests ?? 0),
      pageViews: sum.pageViews + Number(row.sum.pageViews ?? 0),
      bytes: sum.bytes + Number(row.sum.bytes ?? 0),
      cachedRequests: sum.cachedRequests + Number(row.sum.cachedRequests ?? 0),
      dailyUniques: sum.dailyUniques + Number(row.uniq.uniques ?? 0),
    }),
    { requests: 0, pageViews: 0, bytes: 0, cachedRequests: 0, dailyUniques: 0 },
  );
  const cacheRate = totals.requests ? (totals.cachedRequests / totals.requests) * 100 : 0;

  console.log(`Cloudflare — ${zoneName}`);
  console.log(`${isoDate(start)} to ${isoDate(finish)} (${days} days)`);
  console.log(`Requests:                  ${formatNumber(totals.requests)}`);
  console.log(`Page views:                ${formatNumber(totals.pageViews)}`);
  console.log(`Daily unique visitors sum: ${formatNumber(totals.dailyUniques)}`);
  console.log(`Cached requests:           ${formatNumber(totals.cachedRequests)} (${cacheRate.toFixed(1)}%)`);
  console.log(`Data transfer:             ${formatBytes(totals.bytes)}`);
  console.log(`Days with recorded data:   ${rows.length}`);
  console.log("Note: requests include assets and bots; daily uniques are summed and not deduplicated across days.");
}

main().catch((error) => {
  console.error(`Cloudflare report failed: ${error.message}`);
  process.exitCode = 1;
});
