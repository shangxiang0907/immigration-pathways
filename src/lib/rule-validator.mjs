import { PROFILE_SCHEMA_VERSION, RULE_SCHEMA_VERSION } from "./rule-engine.mjs";

const operators = new Set(["equals", "in", "gte"]);

function validateExpression(expression, fields, at, errors) {
  const groups = ["all", "any", "not"].filter((key) => expression?.[key] !== undefined);
  if (groups.length > 1) errors.push(`${at}: an expression cannot combine multiple logical operators`);
  if (expression?.all || expression?.any) {
    const key = expression.all ? "all" : "any";
    if (!Array.isArray(expression[key]) || expression[key].length === 0) errors.push(`${at}.${key}: must contain expressions`);
    else expression[key].forEach((item, index) => validateExpression(item, fields, `${at}.${key}[${index}]`, errors));
    return;
  }
  if (expression?.not) return validateExpression(expression.not, fields, `${at}.not`, errors);
  if (!fields.has(expression?.field)) errors.push(`${at}: unknown profile field '${expression?.field}'`);
  if (!operators.has(expression?.operator)) errors.push(`${at}: unsupported operator '${expression?.operator}'`);
  if (expression?.operator === "in" && (!Array.isArray(expression.values) || expression.values.length === 0)) errors.push(`${at}: 'in' requires values`);
}

export function validateMatchingRuleSets(ruleSets, profileSchema) {
  const errors = [];
  const countryIds = new Set();
  const programIds = new Set();
  const fields = new Set(Object.keys(profileSchema.fields));
  if (profileSchema.version !== PROFILE_SCHEMA_VERSION) errors.push("Applicant-profile schema version is unsupported");
  for (const rules of ruleSets) {
    const at = rules.countryId || "unknown-country";
    if (rules.schemaVersion !== RULE_SCHEMA_VERSION) errors.push(`${at}: unsupported rule schema version`);
    if (rules.profileSchemaVersion !== profileSchema.version) errors.push(`${at}: applicant-profile schema version mismatch`);
    if (countryIds.has(rules.countryId)) errors.push(`${at}: duplicate country rule set`);
    countryIds.add(rules.countryId);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(rules.reviewedAt || "")) errors.push(`${at}: reviewedAt must use YYYY-MM-DD`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(rules.nextReviewAt || "")) errors.push(`${at}: nextReviewAt must use YYYY-MM-DD`);
    for (const program of rules.programs || []) {
      if (programIds.has(program.programId)) errors.push(`${at}: duplicate programId '${program.programId}'`);
      programIds.add(program.programId);
      if (!program.resultKey) errors.push(`${at}.${program.programId}: resultKey is required`);
      if (!Array.isArray(program.checks) || !program.checks.length) errors.push(`${at}.${program.programId}: checks are required`);
      for (const [index, check] of (program.checks || []).entries()) {
        if (!check.reasonKey) errors.push(`${at}.${program.programId}.checks[${index}]: reasonKey is required`);
        validateExpression(check.expression, fields, `${at}.${program.programId}.checks[${index}]`, errors);
      }
    }
  }
  return errors;
}
