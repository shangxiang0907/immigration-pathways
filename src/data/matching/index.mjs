import { australiaRules } from "./australia.mjs";
import { canadaRules } from "./canada.mjs";
import { germanyRules } from "./germany.mjs";

export const matchingRuleSets = [australiaRules, canadaRules, germanyRules];
export const matchingRulesByCountry = Object.fromEntries(matchingRuleSets.map((rules) => [rules.countryId, rules]));
