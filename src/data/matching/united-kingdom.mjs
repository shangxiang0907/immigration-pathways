const equals=(field,value="yes")=>({field,operator:"equals",value});const check=(reasonKey,expression)=>({reasonKey,expression});
const sponsored=[check("job",equals("ukJob")),check("sponsor",equals("ukSponsor")),check("occupation",equals("ukOccupation")),check("salary",equals("ukSalary")),check("english",equals("ukEnglish"))];
export const unitedKingdomRules={schemaVersion:1,profileSchemaVersion:1,countryId:"united-kingdom",reviewedAt:"2026-09-03",nextReviewAt:"2026-12-03",programs:[
  {programId:"united-kingdom-skilled-worker",resultKey:"skilled",checks:sponsored},
  {programId:"united-kingdom-global-talent",resultKey:"talent",checks:[check("age",equals("adult")),check("talent",equals("ukTalentRoute"))]},
  {programId:"united-kingdom-scale-up-worker",resultKey:"scaleup",checks:[...sponsored,check("scaleup",equals("ukScaleUpSponsor")),check("sixMonths",equals("ukSixMonths"))]},
]};
