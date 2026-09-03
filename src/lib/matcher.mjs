import { canadaRules } from "../data/matching/canada.mjs";
import { evaluateProgramRules } from "./rule-engine.mjs";

/** Compatibility adapter while country pages migrate to the unified questionnaire. */
export function evaluateCanadaPrograms(data, reasons) {
  return evaluateProgramRules(data, canadaRules.programs, reasons);
}

export function resultStatus(result) {
  return result.fail.length ? "fail" : result.unknown.length ? "unknown" : "likely";
}
