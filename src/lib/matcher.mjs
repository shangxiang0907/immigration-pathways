/**
 * Evaluate stated minimum requirements for the three reviewed Canada programs.
 * This intentionally leaves unmodeled requirements as unknown rather than inferring eligibility.
 * @param {Record<string, FormDataEntryValue | string>} data
 * @param {Record<string, string>} reasons
 */
export function evaluateCanadaPrograms(data, reasons) {
  const unknownBase = Object.values(data).some((value) => value === "unknown" || value === "untested");
  const evaluated = { cec: { fail: [], unknown: [] }, fsw: { fail: [], unknown: [reasons.fsw67] }, fst: { fail: [], unknown: [] } };
  const fail = (key, condition, reason) => { if (condition) evaluated[key].fail.push(reason); };

  fail("cec", data.work !== "canada" && data.work !== "unknown", reasons.work);
  fail("cec", data.years === "lt1", reasons.year1);
  fail("cec", !["within3", "unknown"].includes(String(data.recency)), reasons.recent3);
  fail("cec", data.teer === "other", reasons.teer);
  const cecLanguagePass = data.teer === "01" ? data.language === "7" : data.teer === "23" ? ["7", "5"].includes(String(data.language)) : false;
  fail("cec", !cecLanguagePass && data.language !== "untested" && data.teer !== "unknown", reasons.langCec);

  fail("fsw", !["canada", "foreign", "unknown"].includes(String(data.work)), reasons.work);
  fail("fsw", data.years === "lt1", reasons.year1);
  fail("fsw", data.recency === "older", reasons.recent10);
  fail("fsw", data.teer === "other", reasons.teer);
  fail("fsw", data.language !== "7" && data.language !== "untested", reasons.lang7);
  fail("fsw", ["foreign-no-eca", "none"].includes(String(data.education)), reasons.education);
  fail("fsw", data.funds === "no" && data.offer !== "yes", reasons.funds);

  fail("fst", data.work !== "trade" && data.work !== "unknown", reasons.work);
  fail("fst", ["lt1", "one"].includes(String(data.years)), reasons.year2);
  fail("fst", !["within3", "within5", "unknown"].includes(String(data.recency)), reasons.recent5);
  fail("fst", !["7", "5", "trade", "untested"].includes(String(data.language)), reasons.langTrade);
  fail("fst", data.offer === "no" && data.certificate === "no", reasons.offerCert);
  fail("fst", data.funds === "no" && data.offer !== "yes", reasons.funds);

  for (const key of Object.keys(evaluated)) {
    fail(key, data.outsideQuebec === "no", reasons.quebec);
    if (unknownBase && !evaluated[key].fail.length) evaluated[key].unknown.push(reasons.unclear);
  }
  return evaluated;
}

export function resultStatus(result) {
  return result.fail.length ? "fail" : result.unknown.length ? "unknown" : "likely";
}
