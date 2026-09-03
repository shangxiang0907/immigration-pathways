const equals = (field, value) => ({ field, operator: "equals", value });
const oneOf = (field, values) => ({ field, operator: "in", values });
const check = (reasonKey, expression) => ({ reasonKey, expression });

const outsideQuebec = check("quebec", equals("outsideQuebec", "yes"));

export const canadaRules = {
  schemaVersion: 1,
  profileSchemaVersion: 1,
  countryId: "canada",
  reviewedAt: "2026-09-03",
  nextReviewAt: "2026-12-03",
  programs: [
    {
      programId: "canada-experience-class",
      resultKey: "cec",
      checks: [
        check("work", equals("work", "canada")),
        check("year1", oneOf("years", ["one", "two"])),
        check("recent3", equals("recency", "within3")),
        check("teer", oneOf("teer", ["01", "23"])),
        check("langCec", { any: [
          { all: [equals("teer", "01"), equals("language", "7")] },
          { all: [equals("teer", "23"), oneOf("language", ["7", "5"])] },
        ] }),
        outsideQuebec,
      ],
    },
    {
      programId: "canada-federal-skilled-worker",
      resultKey: "fsw",
      checks: [
        check("work", oneOf("work", ["canada", "foreign"])),
        check("year1", oneOf("years", ["one", "two"])),
        check("recent10", oneOf("recency", ["within3", "within5", "within10"])),
        check("teer", oneOf("teer", ["01", "23"])),
        check("lang7", equals("language", "7")),
        check("education", oneOf("education", ["canadian", "foreign-eca"])),
        check("funds", { any: [equals("funds", "yes"), equals("offer", "yes")] }),
        outsideQuebec,
        check("fsw67", equals("fsw67", "pass")),
      ],
    },
    {
      programId: "canada-federal-skilled-trades",
      resultKey: "fst",
      checks: [
        check("work", equals("work", "trade")),
        check("year2", equals("years", "two")),
        check("recent5", oneOf("recency", ["within3", "within5"])),
        check("langTrade", oneOf("language", ["7", "5", "trade"])),
        check("offerCert", { any: [equals("offer", "yes"), equals("certificate", "yes")] }),
        check("funds", { any: [equals("funds", "yes"), equals("offer", "yes")] }),
        outsideQuebec,
      ],
    },
  ],
};
