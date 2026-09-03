export const PROFILE_SCHEMA_VERSION = 1;
export const RULE_SCHEMA_VERSION = 1;

const unknownValue = (value) => value === undefined || value === null || value === "" || value === "unknown" || value === "untested";

/** Evaluate a declarative expression to true, false, or null (unknown). */
export function evaluateExpression(profile, expression) {
  if (expression.all) {
    const values = expression.all.map((item) => evaluateExpression(profile, item));
    if (values.includes(false)) return false;
    return values.includes(null) ? null : true;
  }
  if (expression.any) {
    const values = expression.any.map((item) => evaluateExpression(profile, item));
    if (values.includes(true)) return true;
    return values.includes(null) ? null : false;
  }
  if (expression.not) {
    const value = evaluateExpression(profile, expression.not);
    return value === null ? null : !value;
  }
  const actual = profile[expression.field];
  if (unknownValue(actual)) return null;
  if (expression.operator === "equals") return actual === expression.value;
  if (expression.operator === "in") return expression.values.includes(actual);
  if (expression.operator === "gte") return Number(actual) >= Number(expression.value);
  throw new Error(`Unsupported rule operator: ${expression.operator}`);
}

/** Evaluate normalized program rules while keeping uncertainty explicit. */
export function evaluateProgramRules(profile, programs, reasons) {
  return Object.fromEntries(programs.map((program) => {
    const result = { fail: [], unknown: [] };
    for (const check of program.checks) {
      const outcome = evaluateExpression(profile, check.expression);
      if (outcome === false) result.fail.push(reasons[check.reasonKey]);
      if (outcome === null) result.unknown.push(reasons[check.reasonKey]);
    }
    return [program.resultKey, result];
  }));
}
