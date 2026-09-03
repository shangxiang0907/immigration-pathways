import assert from "node:assert/strict";
import { matchingRuleSets } from "../src/data/matching/index.mjs";
import { applicantProfileSchema } from "../src/data/matching/profile-schema.mjs";
import { validateMatchingRuleSets } from "../src/lib/rule-validator.mjs";

assert.deepEqual(validateMatchingRuleSets(matchingRuleSets, applicantProfileSchema), [], "all registered matching rules must be valid");
const broken = structuredClone(matchingRuleSets);
broken[0].programs[0].checks[0].expression.field = "typoField";
assert.match(validateMatchingRuleSets(broken, applicantProfileSchema).join("\n"), /unknown profile field 'typoField'/);
console.log("matching rule schema validation passed");
