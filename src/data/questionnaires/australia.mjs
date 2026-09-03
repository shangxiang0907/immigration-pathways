export const australiaQuestionnaire = {
  countryId: "australia",
  schemaVersion: 1,
  questions: [
    { field: "under45", label: { en: "Will you be under 45 when invited to apply?", zh: "收到申请邀请时，你是否会未满 45 岁？" } },
    { field: "occupation", label: { en: "Is your nominated occupation on the relevant skilled occupation list?", zh: "你的提名职业是否在目标签证适用的技术职业清单上？" } },
    { field: "assessment", label: { en: "Do you hold a suitable, valid skills assessment for that occupation?", zh: "你是否持有该提名职业的有效合格职业评估？" } },
    { field: "points", label: { en: "Is your estimated SkillSelect points score at least 65?", zh: "你的 SkillSelect 估算积分是否至少为 65 分？" } },
    { field: "english", label: { en: "Do you have at least Competent English?", zh: "你是否至少达到 Competent English？" } },
    { field: "stateNomination", label: { en: "Have you received state or territory government nomination?", zh: "你是否已获得州或领地政府提名？" } },
    { field: "relativeSponsor", label: { en: "Do you have an eligible relative sponsor usually resident in a designated regional area for subclass 491?", zh: "你是否有符合 491 条件、通常居住在指定偏远地区的合资格亲属担保？" } },
    { field: "regional", label: { en: "Are you and accompanying family willing to live, work and study in designated regional Australia?", zh: "你和同行家属是否愿意在指定偏远地区生活、工作和学习？" } },
  ],
  programs: {
    visa189: { slug: "australia-skilled-independent-189", name: { en: "Skilled Independent visa (subclass 189)", zh: "独立技术签证（189 类）" } },
    visa190: { slug: "australia-skilled-nominated-190", name: { en: "Skilled Nominated visa (subclass 190)", zh: "州担保技术签证（190 类）" } },
    visa491: { slug: "australia-skilled-work-regional-491", name: { en: "Skilled Work Regional visa (subclass 491)", zh: "偏远地区技术工作签证（491 类）" } },
  },
  copy: {
    en: { eyebrow: "Transparent rule-based screening", title: "Australia skilled visa quick pre-screen", intro: "Answer 8 questions to compare basic requirements for subclasses 189, 190 and 491. Answers stay in your browser and are not uploaded or saved.", yes: "Yes", no: "No", unknown: "Not sure", submit: "See preliminary results", results: "Preliminary results", reset: "Start again", privacy: "This tool does not send answers to a server. Answers disappear when you refresh or leave the page.", likely: "Potential match", fail: "Does not meet stated minimums", more: "More information needed", pass: "No stated minimum barrier found in these answers.", reasons: "What affected this result", details: "Review visa", disclaimer: "This is not an eligibility or invitation decision. Occupation-list fit, assessment validity, points evidence, health, character, nomination criteria and invitation availability still require official confirmation." },
    zh: { eyebrow: "透明规则预筛", title: "澳大利亚技术签证快速预筛", intro: "回答 8 个问题，初步比较 189、190 和 491 三类签证的基础门槛。答案只在浏览器中处理，不会上传或保存。", yes: "是", no: "否", unknown: "不确定", submit: "查看初步结果", results: "初步结果", reset: "重新填写", privacy: "本工具不会将答案发送到服务器。刷新或离开页面后答案即消失。", likely: "可能匹配", fail: "未达到已列最低条件", more: "需要更多信息", pass: "根据这些答案，暂未发现已列最低条件障碍。", reasons: "影响本结果的因素", details: "查看签证", disclaimer: "这不是资格或邀请裁定。职业清单适用性、评估有效性、积分证据、健康品行、提名细则及邀请情况仍须向官方确认。" },
  },
  reasons: {
    en: { age: "You must be under 45 when invited.", occupation: "Your occupation must be on the relevant list.", assessment: "A suitable valid skills assessment is required.", points: "At least 65 points are required; actual invitation scores may be higher.", english: "At least Competent English is required.", nomination: "Subclass 190 requires state or territory nomination.", nominationOrSponsor: "Subclass 491 requires state/territory nomination or eligible-relative sponsorship.", regional: "Subclass 491 requires living, working and studying in designated regional Australia." },
    zh: { age: "收到邀请时须未满 45 岁。", occupation: "职业须在对应技术职业清单上。", assessment: "须有有效的合格职业评估。", points: "至少须有 65 分；实际获邀分数可能更高。", english: "至少须达到 Competent English。", nomination: "190 类要求州或领地政府提名。", nominationOrSponsor: "491 类要求州/领地提名或合资格亲属担保。", regional: "491 类要求在指定偏远地区生活、工作和学习。" },
  },
};
