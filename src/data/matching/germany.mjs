const equals = (field, value = "yes") => ({ field, operator: "equals", value });
const check = (reasonKey, expression) => ({ reasonKey, expression });

export const germanyRules = {
  schemaVersion: 1,
  profileSchemaVersion: 1,
  countryId: "germany",
  reviewedAt: "2026-09-03",
  nextReviewAt: "2026-12-03",
  programs: [
    {
      programId: "germany-eu-blue-card",
      resultKey: "blue",
      checks: [
        check("qualification", equals("recognized")),
        check("job", equals("job")),
        check("duration", equals("sixMonths")),
        check("salary", { any: [equals("salary", "over45"), equals("salary", "general"), { all: [equals("salary", "lower"), equals("lowerEligible")] }] }),
      ],
    },
    {
      programId: "germany-work-qualified-professionals",
      resultKey: "qualified",
      checks: [
        check("qualification", equals("recognized")),
        check("job", equals("job")),
        check("over45", { any: [{ not: equals("over45First") }, equals("salary", "over45"), equals("pension")] }),
      ],
    },
    {
      programId: "germany-opportunity-card",
      resultKey: "opportunity",
      checks: [
        check("funds", equals("funds")),
        check("pointsRoute", { any: [equals("recognized"), { all: [equals("formalQualification"), equals("language"), equals("sixPoints")] }] }),
      ],
    },
  ],
};
