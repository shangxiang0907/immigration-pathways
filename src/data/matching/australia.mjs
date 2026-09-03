const equals = (field, value="yes") => ({ field, operator:"equals", value });
const shared = [
  {reasonKey:"age",expression:equals("under45")},
  {reasonKey:"occupation",expression:equals("occupation")},
  {reasonKey:"assessment",expression:equals("assessment")},
  {reasonKey:"points",expression:equals("points")},
  {reasonKey:"english",expression:equals("english")},
];
export const australiaRules = {
  schemaVersion:1, profileSchemaVersion:1, countryId:"australia", reviewedAt:"2026-09-03",
  programs:[
    {programId:"australia-skilled-independent-189",resultKey:"visa189",checks:[...shared]},
    {programId:"australia-skilled-nominated-190",resultKey:"visa190",checks:[...shared,{reasonKey:"nomination",expression:equals("stateNomination")}]},
    {programId:"australia-skilled-work-regional-491",resultKey:"visa491",checks:[...shared,{reasonKey:"nominationOrSponsor",expression:{any:[equals("stateNomination"),equals("relativeSponsor")]}},{reasonKey:"regional",expression:equals("regional")}]},
  ],
};
