import { australiaRules } from "./australia.mjs";
import { canadaRules } from "./canada.mjs";
import { germanyRules } from "./germany.mjs";
import { newZealandRules } from "./new-zealand.mjs";
import { unitedKingdomRules } from "./united-kingdom.mjs";
import { irelandRules } from "./ireland.mjs";
import { netherlandsRules } from "./netherlands.mjs";
import { franceRules } from "./france.mjs";
import { portugalRules } from "./portugal.mjs";
import { spainRules } from "./spain.mjs";
import { japanRules } from "./japan.mjs";
import { singaporeRules } from "./singapore.mjs";
import { unitedStatesRules } from "./united-states.mjs";

export const matchingRuleSets = [australiaRules, canadaRules, germanyRules, newZealandRules, unitedKingdomRules, irelandRules, netherlandsRules, franceRules, portugalRules, spainRules, japanRules, singaporeRules, unitedStatesRules];
export const matchingRulesByCountry = Object.fromEntries(matchingRuleSets.map((rules) => [rules.countryId, rules]));
