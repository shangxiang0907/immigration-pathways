/**
 * Coverage is a promise about depth, so the directory leads with the records
 * that actually carry reviewed detail. Directory-only entries stay reachable but
 * sort last, since they are an official link and nothing more.
 */
const rank = { deep: 0, overview: 1, directory: 2 };

export function coverageRank(coverage) {
  return rank[coverage] ?? rank.directory;
}

/** Reviewed records first, then alphabetical within each coverage level. */
export function sortByCoverage(countries, collator) {
  return [...countries].sort((a, b) =>
    coverageRank(a.data.coverage) - coverageRank(b.data.coverage) ||
    collator(a, b));
}

export function countByCoverage(countries) {
  const counts = { deep: 0, overview: 0, directory: 0 };
  for (const country of countries) counts[country.data.coverage] += 1;
  return counts;
}
