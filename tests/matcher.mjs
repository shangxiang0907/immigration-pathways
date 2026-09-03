import assert from "node:assert/strict";
import { evaluateCanadaPrograms, resultStatus } from "../src/lib/matcher.mjs";
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
