/** @param {Record<string, FormDataEntryValue | string>} data @param {Record<string, string>} reasons */
export function evaluateAustraliaPrograms(data, reasons) {
  const evaluated = { visa189: { fail: [], unknown: [] }, visa190: { fail: [], unknown: [] }, visa491: { fail: [], unknown: [] } };
  const keys = Object.keys(evaluated);
  const required = (field, reason) => { for (const key of keys) { if (data[field] === "no") evaluated[key].fail.push(reason); else if (data[field] === "unknown") evaluated[key].unknown.push(reason); } };
  required("under45", reasons.age); required("occupation", reasons.occupation); required("assessment", reasons.assessment); required("points", reasons.points); required("english", reasons.english);
  if (data.stateNomination === "no") evaluated.visa190.fail.push(reasons.nomination); else if (data.stateNomination === "unknown") evaluated.visa190.unknown.push(reasons.nomination);
  if (data.stateNomination === "no" && data.relativeSponsor === "no") evaluated.visa491.fail.push(reasons.nominationOrSponsor);
  else if (data.stateNomination !== "yes" && data.relativeSponsor !== "yes") evaluated.visa491.unknown.push(reasons.nominationOrSponsor);
  if (data.regional === "no") evaluated.visa491.fail.push(reasons.regional); else if (data.regional === "unknown") evaluated.visa491.unknown.push(reasons.regional);
  return evaluated;
}
