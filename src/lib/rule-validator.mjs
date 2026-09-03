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

export function validateQuestionnaires(questionnaires, rulesByCountry, profileSchema) {
  const errors = [];
  const fields = new Set(Object.keys(profileSchema.fields));
  for (const [countryId, questionnaire] of Object.entries(questionnaires)) {
    const rules = rulesByCountry[countryId];
    if (!rules) { errors.push(`${countryId}: questionnaire has no matching rule set`); continue; }
    if (questionnaire.countryId !== countryId) errors.push(`${countryId}: questionnaire countryId mismatch`);
    if (questionnaire.schemaVersion !== 1) errors.push(`${countryId}: unsupported questionnaire schema version`);
    const questionFields = new Set();
    for (const question of questionnaire.questions || []) {
      if (question.type && !["radio", "select"].includes(question.type)) errors.push(`${countryId}.${question.field}: unsupported question type '${question.type}'`);
      if (!fields.has(question.field)) errors.push(`${countryId}: unknown question field '${question.field}'`);
      if (questionFields.has(question.field)) errors.push(`${countryId}: duplicate question field '${question.field}'`);
      questionFields.add(question.field);
      if (!question.label?.en || !question.label?.zh) errors.push(`${countryId}.${question.field}: bilingual labels are required`);
      if (question.type === "select") {
        if (!Array.isArray(question.options) || question.options.length < 2) errors.push(`${countryId}.${question.field}: select options are required`);
        for (const option of question.options || []) if (option.value === undefined || !option.label?.en || !option.label?.zh) errors.push(`${countryId}.${question.field}: every option needs a value and bilingual label`);
      }
    }
    for (const program of rules.programs) {
      const display = questionnaire.programs?.[program.resultKey];
      if (!display?.slug || !display?.name?.en || !display?.name?.zh) errors.push(`${countryId}.${program.resultKey}: bilingual program display metadata is required`);
      for (const check of program.checks) {
        if (!questionnaire.reasons?.en?.[check.reasonKey] || !questionnaire.reasons?.zh?.[check.reasonKey]) errors.push(`${countryId}.${program.resultKey}: missing bilingual reason '${check.reasonKey}'`);
      }
    }
  }
  return errors;
}
