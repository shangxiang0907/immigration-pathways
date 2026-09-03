import { germanyRules } from "../data/matching/germany.mjs";
import { evaluateProgramRules } from "./rule-engine.mjs";
/** Compatibility adapter while country pages migrate to the unified questionnaire. */
export function evaluateGermanyPrograms(data, reasons) {
  return evaluateProgramRules(data, germanyRules.programs, reasons);
}
