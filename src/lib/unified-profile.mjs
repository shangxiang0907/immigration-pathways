import { evaluateProgramRules } from "./rule-engine.mjs";

/** Convert the short shared profile into known country-rule answers. Unmappable fields stay unknown. */
export function projectProfile(profile) {
  const age = profile.age === "under45" ? "yes" : profile.age === "45plus" ? "no" : "unknown";
  const years = profile.experience === "lt1" ? "lt1" : profile.experience === "one" ? "one" : profile.experience === "twoPlus" ? "two" : "unknown";
  const offer = (country) => profile.jobOffer === country ? "yes" : profile.jobOffer === "none" ? "no" : "unknown";
  return {
    australia: { under45: age, occupation:"unknown", assessment:profile.qualification, points:"unknown", english:profile.english, stateNomination:"unknown", relativeSponsor:"unknown", regional:profile.regional },
    canada: { work:"unknown", years, recency:"unknown", teer:"unknown", language:"untested", education:"unknown", offer:offer("canada"), certificate:"unknown", funds:profile.funds, outsideQuebec:"unknown" },
    germany: { recognized:profile.qualification, job:offer("germany"), sixMonths:"unknown", salary:"unknown", lowerEligible:"unknown", over45First:"unknown", pension:"unknown", formalQualification:profile.education === "postsecondary" ? "yes" : "unknown", language:"unknown", sixPoints:"unknown", funds:profile.funds },
    "new-zealand": { age55:profile.age === "under45" ? "yes" : "unknown", nzJob:offer("new-zealand"), nzEnglish:profile.english, nzSmcPathway:"unknown", nzAccredited:"unknown", nzTier1:"unknown", nzTier2:"unknown", nzWork24:"unknown", nzRoleRequirements:"unknown" },
    "united-kingdom": { adult:profile.age === "unknown" ? "unknown" : "yes", ukJob:offer("united-kingdom"), ukSponsor:"unknown", ukOccupation:"unknown", ukSalary:"unknown", ukEnglish:profile.english, ukTalentRoute:"unknown", ukScaleUpSponsor:"unknown", ukSixMonths:"unknown" },
    ireland:{ieJob:offer("ireland"),ieCriticalOccupation:"unknown",ieGeneralOccupation:"unknown",ieSalary:"unknown",ieTwoYears:"unknown",ieLabourMarket:"unknown"},
    netherlands:{nlJob:offer("netherlands"),nlSponsor:"unknown",nlIncome:"unknown",nlBlueQualification:"unknown"},
    france:{frJob:offer("france"),frQualification:"unknown",frBlueQualification:"unknown",frSalary:"unknown"},
    portugal:{ptJob:offer("portugal"),ptWorkVisa:"unknown",ptGeneral:"unknown",ptQualification:"unknown",ptQualifiedVisa:"unknown",ptActivity:"unknown"},
    spain:{esJob:offer("spain"),esQualification:"unknown",esAssessment:"unknown"},
    japan:{jpJob:offer("japan"),jpQualification:"unknown",jpAssessment:"unknown"},
    singapore:{sgJob:offer("singapore"),sgQualification:"unknown",sgAssessment:"unknown"},
    "united-states":{usJob:offer("united-states"),usQualification:"unknown",usAssessment:"unknown"},
    austria:{atJob:offer("austria"),atQualification:"unknown",atAssessment:"unknown"},denmark:{dkJob:offer("denmark"),dkQualification:"unknown",dkAssessment:"unknown"},finland:{fiJob:offer("finland"),fiQualification:"unknown",fiAssessment:"unknown"},norway:{noJob:offer("norway"),noQualification:"unknown",noAssessment:"unknown"},
    belgium:{beJob:offer("belgium"),beQualification:"unknown",beAssessment:"unknown"},sweden:{seJob:offer("sweden"),seQualification:"unknown",seAssessment:"unknown"},switzerland:{chJob:offer("switzerland"),chQualification:"unknown",chAssessment:"unknown"},italy:{itJob:offer("italy"),itQualification:"unknown",itAssessment:"unknown"},
    czechia:{czJob:offer("czechia"),czQualification:profile.qualification,czAssessment:"unknown"},poland:{plJob:offer("poland"),plQualification:profile.qualification,plAssessment:"unknown"},greece:{grJob:offer("greece"),grQualification:profile.qualification,grAssessment:"unknown"},malta:{mtJob:offer("malta"),mtQualification:profile.qualification,mtAssessment:"unknown"},
    estonia:{eeJob:offer("estonia"),eeQualification:profile.qualification,eeAssessment:"unknown"},latvia:{lvJob:offer("latvia"),lvQualification:profile.qualification,lvAssessment:"unknown"},lithuania:{ltJob:offer("lithuania"),ltQualification:profile.qualification,ltAssessment:"unknown"},luxembourg:{luJob:offer("luxembourg"),luQualification:profile.qualification,luAssessment:"unknown"},
    hungary:{huJob:offer("hungary"),huQualification:profile.qualification,huAssessment:"unknown"},croatia:{hrJob:offer("croatia"),hrQualification:profile.qualification,hrAssessment:"unknown"},cyprus:{cyJob:offer("cyprus"),cyQualification:profile.qualification,cyAssessment:"unknown"},iceland:{isJob:offer("iceland"),isQualification:profile.qualification,isAssessment:"unknown"},
  };
}

export function summarizeCountry(evaluated) {
  const programs = Object.values(evaluated);
  const viable = programs.filter((result) => result.fail.length === 0);
  return { total: programs.length, viable: viable.length, knownBarriers: Math.min(...programs.map((result) => result.fail.length)), missing: Math.min(...viable.length ? viable.map((result) => result.unknown.length) : programs.map((result) => result.unknown.length)) };
}

export function rankCountries(profile, ruleSets) {
  const projected = projectProfile(profile);
  const reasons = new Proxy({}, { get: (_, key) => String(key) });
  return ruleSets.map((rules) => {
    const evaluated = evaluateProgramRules(projected[rules.countryId], rules.programs, reasons);
    const best = Object.entries(evaluated).sort(([, a], [, b]) => a.fail.length - b.fail.length || a.unknown.length - b.unknown.length)[0];
    const program = rules.programs.find((item) => item.resultKey === best[0]);
    return { countryId: rules.countryId, bestProgramId: program?.programId, barrierKeys: best[1].fail, ...summarizeCountry(evaluated) };
  }).sort((a, b) => a.knownBarriers - b.knownBarriers || b.viable - a.viable || a.missing - b.missing);
}
