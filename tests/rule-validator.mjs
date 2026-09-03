import assert from "node:assert/strict";
import { matchingRuleSets } from "../src/data/matching/index.mjs";
import { applicantProfileSchema } from "../src/data/matching/profile-schema.mjs";
import { validateMatchingRuleSets } from "../src/lib/rule-validator.mjs";
import { validateQuestionnaires } from "../src/lib/rule-validator.mjs";
import { matchingRulesByCountry } from "../src/data/matching/index.mjs";
import { questionnairesByCountry } from "../src/data/questionnaires/index.mjs";

assert.deepEqual(validateMatchingRuleSets(matchingRuleSets, applicantProfileSchema), [], "all registered matching rules must be valid");
const broken = structuredClone(matchingRuleSets);
broken[0].programs[0].checks[0].expression.field = "typoField";
assert.match(validateMatchingRuleSets(broken, applicantProfileSchema).join("\n"), /unknown profile field 'typoField'/);
assert.deepEqual(validateQuestionnaires(questionnairesByCountry, matchingRulesByCountry, applicantProfileSchema), [], "all registered questionnaires must align with their rules");
const brokenQuestionnaires = structuredClone(questionnairesByCountry);
delete brokenQuestionnaires.australia.reasons.zh.age;
assert.match(validateQuestionnaires(brokenQuestionnaires, matchingRulesByCountry, applicantProfileSchema).join("\n"), /missing bilingual reason 'age'/);
console.log("matching rule schema validation passed");
