import assert from "node:assert/strict";
import { evaluateCanadaPrograms, resultStatus } from "../src/lib/matcher.mjs";
import { evaluateAustraliaPrograms } from "../src/lib/australia-matcher.mjs";
import { evaluateGermanyPrograms } from "../src/lib/germany-matcher.mjs";
const r = new Proxy({}, { get: (_, key) => String(key) });
const base = { work: "canada", years: "two", recency: "within3", teer: "01", language: "7", education: "canadian", offer: "yes", certificate: "no", funds: "yes", outsideQuebec: "yes" };

let result = evaluateCanadaPrograms(base, r);
assert.equal(resultStatus(result.cec), "likely", "qualifying Canadian experience should be a potential CEC match");
assert.equal(resultStatus(result.fsw), "unknown", "FSW remains unknown until its separate 67-point test is modeled");
assert.equal(resultStatus(result.fst), "fail", "non-trade work must not match FST");

result = evaluateCanadaPrograms({ ...base, work: "foreign", years: "one", offer: "no" }, r);
assert.equal(resultStatus(result.cec), "fail", "foreign work must not satisfy CEC");
assert.equal(resultStatus(result.fsw), "unknown", "otherwise qualifying FSW answers still require the 67-point test");

result = evaluateCanadaPrograms({ ...base, work: "trade", teer: "23", language: "trade", education: "none", offer: "no", certificate: "yes" }, r);
assert.equal(resultStatus(result.fst), "likely", "two years of recent trade work plus a certificate should be a potential FST match");

result = evaluateCanadaPrograms({ ...base, work: "unknown" }, r);
assert.equal(resultStatus(result.cec), "unknown", "uncertain required answers must not become a potential match");

result = evaluateCanadaPrograms({ ...base, outsideQuebec: "no" }, r);
assert.deepEqual(Object.values(result).map(resultStatus), ["fail", "fail", "fail"], "Quebec intent must fail all three federal programs");

console.log("matcher boundary tests passed");

const australiaBase = { under45: "yes", occupation: "yes", assessment: "yes", points: "yes", english: "yes", stateNomination: "no", relativeSponsor: "no", regional: "yes" };
let australia = evaluateAustraliaPrograms(australiaBase, r);
assert.equal(resultStatus(australia.visa189), "likely", "189 should not require nomination");
assert.equal(resultStatus(australia.visa190), "fail", "190 must require state or territory nomination");
assert.equal(resultStatus(australia.visa491), "fail", "491 must require nomination or eligible-relative sponsorship");
australia = evaluateAustraliaPrograms({ ...australiaBase, relativeSponsor: "yes" }, r);
assert.equal(resultStatus(australia.visa491), "likely", "491 may match with eligible-relative sponsorship and regional intent");
australia = evaluateAustraliaPrograms({ ...australiaBase, under45: "unknown" }, r);
assert.equal(resultStatus(australia.visa189), "unknown", "unknown age must not produce a potential match");
australia = evaluateAustraliaPrograms({ ...australiaBase, stateNomination: "yes", regional: "no" }, r);
assert.equal(resultStatus(australia.visa190), "likely", "regional intent is not a subclass 190 minimum");
assert.equal(resultStatus(australia.visa491), "fail", "491 requires regional residence intent");
console.log("Australia matcher boundary tests passed");

const germanyBase = { recognized:"yes", job:"yes", sixMonths:"yes", salary:"general", lowerEligible:"no", over45First:"no", pension:"no", formalQualification:"yes", language:"yes", sixPoints:"yes", funds:"yes" };
let germany = evaluateGermanyPrograms(germanyBase, r);
assert.deepEqual(Object.values(germany).map(resultStatus), ["likely","likely","likely"]);
germany = evaluateGermanyPrograms({ ...germanyBase, recognized:"no", job:"no" }, r);
assert.equal(resultStatus(germany.blue), "fail"); assert.equal(resultStatus(germany.qualified), "fail"); assert.equal(resultStatus(germany.opportunity), "likely", "points route may work without German recognition");
germany = evaluateGermanyPrograms({ ...germanyBase, salary:"lower", lowerEligible:"unknown" }, r);
assert.equal(resultStatus(germany.blue), "unknown");
germany = evaluateGermanyPrograms({ ...germanyBase, over45First:"yes", salary:"general", pension:"no" }, r);
assert.equal(resultStatus(germany.qualified), "fail");
console.log("Germany matcher boundary tests passed");
