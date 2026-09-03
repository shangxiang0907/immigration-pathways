import { australiaRules } from "../data/matching/australia.mjs";
import { evaluateProgramRules } from "./rule-engine.mjs";
/** Compatibility adapter while country pages migrate to the unified questionnaire. */
export function evaluateAustraliaPrograms(data, reasons) {
  return evaluateProgramRules(data, australiaRules.programs, reasons);
}
