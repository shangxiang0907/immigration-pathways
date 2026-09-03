import { australiaRules } from "./australia.mjs";
import { canadaRules } from "./canada.mjs";
import { germanyRules } from "./germany.mjs";
import { newZealandRules } from "./new-zealand.mjs";

export const matchingRuleSets = [australiaRules, canadaRules, germanyRules, newZealandRules];
export const matchingRulesByCountry = Object.fromEntries(matchingRuleSets.map((rules) => [rules.countryId, rules]));
