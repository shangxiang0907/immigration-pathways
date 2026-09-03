/** Convert the short shared profile into known country-rule answers. Unmappable fields stay unknown. */
export function projectProfile(profile) {
  const age = profile.age === "under45" ? "yes" : profile.age === "45plus" ? "no" : "unknown";
  const years = profile.experience === "lt1" ? "lt1" : profile.experience === "one" ? "one" : profile.experience === "twoPlus" ? "two" : "unknown";
  const offer = (country) => profile.jobOffer === country ? "yes" : profile.jobOffer === "none" ? "no" : "unknown";
  return {
    australia: { under45: age, occupation:"unknown", assessment:"unknown", points:"unknown", english:profile.english, stateNomination:"unknown", relativeSponsor:"unknown", regional:profile.regional },
    canada: { work:"unknown", years, recency:"unknown", teer:"unknown", language:"untested", education:"unknown", offer:offer("canada"), certificate:"unknown", funds:profile.funds, outsideQuebec:"unknown" },
    germany: { recognized:"unknown", job:offer("germany"), sixMonths:"unknown", salary:"unknown", lowerEligible:"unknown", over45First:"unknown", pension:"unknown", formalQualification:profile.education === "postsecondary" ? "yes" : "unknown", language:"unknown", sixPoints:"unknown", funds:profile.funds },
  };
}

export function summarizeCountry(evaluated) {
  const programs = Object.values(evaluated);
  const viable = programs.filter((result) => result.fail.length === 0);
  return { viable: viable.length, knownBarriers: Math.min(...programs.map((result) => result.fail.length)), missing: Math.min(...viable.length ? viable.map((result) => result.unknown.length) : programs.map((result) => result.unknown.length)) };
}
