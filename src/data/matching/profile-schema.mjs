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
  },
};
