const equals=(field,value="yes")=>({field,operator:"equals",value});const check=(reasonKey,expression)=>({reasonKey,expression});
const shared=[check("age",equals("age55")),check("job",equals("nzJob")),check("english",equals("nzEnglish"))];
export const newZealandRules={schemaVersion:1,profileSchemaVersion:1,countryId:"new-zealand",reviewedAt:"2026-09-03",nextReviewAt:"2026-10-03",programs:[
  {programId:"new-zealand-skilled-migrant-category",resultKey:"smc",checks:[...shared,check("pathway",equals("nzSmcPathway"))]},
  {programId:"new-zealand-straight-to-residence",resultKey:"straight",checks:[...shared,check("accredited",equals("nzAccredited")),check("tier1",equals("nzTier1")),check("role",equals("nzRoleRequirements"))]},
  {programId:"new-zealand-work-to-residence",resultKey:"work",checks:[...shared,check("accredited",equals("nzAccredited")),check("tier2",equals("nzTier2")),check("work24",equals("nzWork24")),check("role",equals("nzRoleRequirements"))]},
]};
