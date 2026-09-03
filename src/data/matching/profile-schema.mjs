/**
 * Canonical applicant-profile field catalogue.
 * Country questionnaires may ask a subset, but rule files must only use keys listed here.
 */
export const applicantProfileSchema = {
  version: 1,
  fields: {
    under45: { type: "answer" }, occupation: { type: "answer" }, assessment: { type: "answer" }, points: { type: "answer" }, english: { type: "answer" },
    stateNomination: { type: "answer" }, relativeSponsor: { type: "answer" }, regional: { type: "answer" },
    work: { type: "choice" }, years: { type: "choice" }, recency: { type: "choice" }, teer: { type: "choice" }, language: { type: "choice" },
    education: { type: "choice" }, offer: { type: "answer" }, certificate: { type: "answer" }, funds: { type: "answer" }, outsideQuebec: { type: "answer" },
    fsw67: { type: "derived" }, recognized: { type: "answer" }, job: { type: "answer" }, sixMonths: { type: "answer" }, salary: { type: "choice" },
    lowerEligible: { type: "answer" }, over45First: { type: "answer" }, pension: { type: "answer" }, formalQualification: { type: "answer" }, sixPoints: { type: "answer" },
    age55: { type: "answer" }, nzJob: { type: "answer" }, nzEnglish: { type: "answer" }, nzSmcPathway: { type: "answer" }, nzAccredited: { type: "answer" }, nzTier1: { type: "answer" }, nzTier2: { type: "answer" }, nzWork24: { type: "answer" }, nzRoleRequirements: { type: "answer" },
    adult: { type: "answer" }, ukJob: { type: "answer" }, ukSponsor: { type: "answer" }, ukOccupation: { type: "answer" }, ukSalary: { type: "answer" }, ukEnglish: { type: "answer" }, ukTalentRoute: { type: "answer" }, ukScaleUpSponsor: { type: "answer" }, ukSixMonths: { type: "answer" },
    ieJob:{type:"answer"},ieCriticalOccupation:{type:"answer"},ieGeneralOccupation:{type:"answer"},ieSalary:{type:"answer"},ieTwoYears:{type:"answer"},ieLabourMarket:{type:"answer"},nlJob:{type:"answer"},nlSponsor:{type:"answer"},nlIncome:{type:"answer"},nlBlueQualification:{type:"answer"},frJob:{type:"answer"},frQualification:{type:"answer"},frBlueQualification:{type:"answer"},frSalary:{type:"answer"},ptJob:{type:"answer"},ptWorkVisa:{type:"answer"},ptGeneral:{type:"answer"},ptQualification:{type:"answer"},ptQualifiedVisa:{type:"answer"},ptActivity:{type:"answer"},
    esJob:{type:"answer"},esQualification:{type:"answer"},esAssessment:{type:"answer"},jpJob:{type:"answer"},jpQualification:{type:"answer"},jpAssessment:{type:"answer"},sgJob:{type:"answer"},sgQualification:{type:"answer"},sgAssessment:{type:"answer"},usJob:{type:"answer"},usQualification:{type:"answer"},usAssessment:{type:"answer"},
    atJob:{type:"answer"},atQualification:{type:"answer"},atAssessment:{type:"answer"},dkJob:{type:"answer"},dkQualification:{type:"answer"},dkAssessment:{type:"answer"},fiJob:{type:"answer"},fiQualification:{type:"answer"},fiAssessment:{type:"answer"},noJob:{type:"answer"},noQualification:{type:"answer"},noAssessment:{type:"answer"},
    beJob:{type:"answer"},beQualification:{type:"answer"},beAssessment:{type:"answer"},seJob:{type:"answer"},seQualification:{type:"answer"},seAssessment:{type:"answer"},chJob:{type:"answer"},chQualification:{type:"answer"},chAssessment:{type:"answer"},itJob:{type:"answer"},itQualification:{type:"answer"},itAssessment:{type:"answer"},
    czJob:{type:"answer"},czQualification:{type:"answer"},czAssessment:{type:"answer"},plJob:{type:"answer"},plQualification:{type:"answer"},plAssessment:{type:"answer"},grJob:{type:"answer"},grQualification:{type:"answer"},grAssessment:{type:"answer"},mtJob:{type:"answer"},mtQualification:{type:"answer"},mtAssessment:{type:"answer"},
    eeJob:{type:"answer"},eeQualification:{type:"answer"},eeAssessment:{type:"answer"},lvJob:{type:"answer"},lvQualification:{type:"answer"},lvAssessment:{type:"answer"},ltJob:{type:"answer"},ltQualification:{type:"answer"},ltAssessment:{type:"answer"},luJob:{type:"answer"},luQualification:{type:"answer"},luAssessment:{type:"answer"},
    huJob:{type:"answer"},huQualification:{type:"answer"},huAssessment:{type:"answer"},hrJob:{type:"answer"},hrQualification:{type:"answer"},hrAssessment:{type:"answer"},cyJob:{type:"answer"},cyQualification:{type:"answer"},cyAssessment:{type:"answer"},isJob:{type:"answer"},isQualification:{type:"answer"},isAssessment:{type:"answer"},
  },
};
