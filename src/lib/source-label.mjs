/**
 * A short, readable label for an external source link.
 *
 * Several sources on one record often share a host, so the hostname alone
 * renders as repeated identical links. Appending the last path segment keeps
 * each link distinguishable without showing the full URL.
 */
export function sourceLabel(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  const host = parsed.hostname.replace(/^www\./, "");
  const segments = parsed.pathname.split("/").filter(Boolean)
    .map((segment) => segment.replace(/\.[a-z]+$/i, "").replace(/-node$/, ""));
  // Trailing numeric IDs identify nothing to a reader, so fall back past them.
  const segment = segments.reverse().find((value) => value && !/^\d+$/.test(value));
  return segment ? `${host}/${segment}` : host;
}
