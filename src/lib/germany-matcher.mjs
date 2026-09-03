/** @param {Record<string, string | FormDataEntryValue>} d @param {Record<string,string>} r */
export function evaluateGermanyPrograms(d, r) {
  const out = { blue: { fail: [], unknown: [] }, qualified: { fail: [], unknown: [] }, opportunity: { fail: [], unknown: [] } };
  const check = (key, field, reason) => { if (d[field] === "no") out[key].fail.push(reason); else if (d[field] === "unknown") out[key].unknown.push(reason); };
  check("blue", "recognized", r.qualification); check("blue", "job", r.job); check("blue", "sixMonths", r.duration);
  if (d.salary === "below") out.blue.fail.push(r.salary); else if (d.salary === "unknown") out.blue.unknown.push(r.salary); else if (d.salary === "lower") check("blue", "lowerEligible", r.lowerEligible);
  check("qualified", "recognized", r.qualification); check("qualified", "job", r.job);
  if (d.over45First === "yes") { if (d.salary !== "over45" && d.pension !== "yes") out.qualified.fail.push(r.over45); }
  else if (d.over45First === "unknown") out.qualified.unknown.push(r.over45);
  check("opportunity", "funds", r.funds);
  if (d.recognized !== "yes") {
    if (d.formalQualification === "no" || d.language === "no" || d.sixPoints === "no") out.opportunity.fail.push(r.pointsRoute);
    else if ([d.recognized, d.formalQualification, d.language, d.sixPoints].includes("unknown")) out.opportunity.unknown.push(r.pointsRoute);
  }
  return out;
}
