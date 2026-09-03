const label = (en, zh) => ({ en, zh });
const radio = (field, en, zh) => ({ type: "radio", field, label: label(en, zh) });
const select = (field, en, zh, options) => ({ type: "select", field, label: label(en, zh), options: options.map(([value, en, zh]) => ({ value, label: label(en, zh) })) });
const choose = ["", "Select one", "请选择"];

export const canadaQuestionnaire = {
  countryId: "canada", schemaVersion: 1,
  questions: [
    select("work", "Which best describes your main skilled work experience?", "你的主要技术工作经验属于哪类？", [choose,["canada","Skilled Canadian work in TEER 0–3","加拿大境内 TEER 0–3 技术工作"],["foreign","Skilled foreign work in TEER 0–3","加拿大境外 TEER 0–3 技术工作"],["trade","Work in an eligible skilled trade","合资格技术工种工作"],["other","None of these","以上都不是"],["unknown","Not sure","不确定"]]),
    select("years", "How much relevant work experience do you have?", "相关工作经验有多久？", [choose,["lt1","Less than 1 year","少于 1 年"],["one","At least 1 but less than 2 years","至少 1 年但少于 2 年"],["two","At least 2 years","至少 2 年"],["unknown","Not sure","不确定"]]),
    select("recency", "How recent is that experience?", "这段经验距今多久？", [choose,["within3","Within the last 3 years","3 年以内"],["within5","More than 3 but within 5 years","超过 3 年但在 5 年以内"],["within10","More than 5 but within 10 years","超过 5 年但在 10 年以内"],["older","More than 10 years ago","超过 10 年"],["unknown","Not sure","不确定"]]),
    select("teer", "What is the TEER of your Canadian or general skilled work?", "你的加拿大或一般技术工作属于哪个 TEER？", [choose,["01","TEER 0 or 1","TEER 0 或 1"],["23","TEER 2 or 3","TEER 2 或 3"],["other","Other","其他"],["unknown","Not sure","不确定"]]),
    select("language", "What is your lowest score on an approved language test?", "认可语言考试的最低单项水平？", [choose,["7","At least CLB/NCLC 7 in all four abilities","四项均达到 CLB/NCLC 7"],["5","At least CLB/NCLC 5 in all four, but not all 7","四项均达到 CLB/NCLC 5，但未全达 7"],["trade","5 speaking/listening and 4 reading/writing","听说达 5、读写达 4"],["below","Below these levels","低于上述水平"],["untested","Not tested or not sure","未考试或不确定"]]),
    select("education", "What education evidence do you have?", "你的学历证明情况？", [choose,["canadian","Canadian secondary or higher credential","加拿大高中或以上学历"],["foreign-eca","Foreign secondary or higher credential with ECA","境外高中或以上学历，已有 ECA"],["foreign-no-eca","Foreign credential without ECA","境外学历，尚无 ECA"],["none","No secondary credential","没有高中学历"],["unknown","Not sure","不确定"]]),
    radio("offer", "Do you have a valid Canadian full-time job offer for at least 1 year?", "你是否有至少 1 年的有效加拿大全职工作邀请？"),
    radio("certificate", "Do you hold a Canadian certificate of qualification in the skilled trade?", "你是否有加拿大主管机构签发的相应技工资格证书？"),
    radio("funds", "If required, can you show settlement funds meeting the latest official amount?", "如项目要求，你能否提供达到官网最新金额的安家资金证明？"),
    radio("outsideQuebec", "Do you plan to live outside Quebec?", "你是否计划居住在魁北克以外？"),
  ],
  programs: {
    cec:{slug:"canada-experience-class",name:label("Canadian Experience Class","加拿大经验类")}, fsw:{slug:"canada-federal-skilled-worker",name:label("Federal Skilled Worker Program","联邦技术工人计划")}, fst:{slug:"canada-federal-skilled-trades",name:label("Federal Skilled Trades Program","联邦技工计划")},
  },
  copy: {
    en:{eyebrow:"Transparent rule-based screening",title:"Canada quick pre-screen",intro:"Answer 10 questions to compare the minimum requirements of three federal Express Entry programs. Answers stay in your browser.",yes:"Yes",no:"No",unknown:"Not sure",submit:"See preliminary results",results:"Preliminary results",reset:"Start again",privacy:"This tool does not send answers to a server. Answers disappear when you refresh or leave the page.",likely:"Potential match",fail:"Does not meet stated minimums",more:"More information needed",pass:"No stated minimum barrier found in these answers.",reasons:"What affected this result",details:"Review program",disclaimer:"This is not an eligibility decision. NOC duties, work hours, admissibility, document validity and Express Entry ranking still require confirmation."},
    zh:{eyebrow:"透明规则预筛",title:"加拿大快速预筛",intro:"回答 10 个问题，比较三项 Express Entry 联邦项目的最低条件。答案只在浏览器中处理。",yes:"是",no:"否",unknown:"不确定",submit:"查看初步结果",results:"初步结果",reset:"重新填写",privacy:"本工具不会将答案发送到服务器。刷新或离开页面后答案即消失。",likely:"可能匹配",fail:"未达到已列最低条件",more:"需要更多信息",pass:"根据这些答案，暂未发现已列最低条件障碍。",reasons:"影响本结果的因素",details:"查看项目",disclaimer:"这不是资格裁定。NOC 职责、工时、入境许可、文件有效性及 Express Entry 排名仍需确认。"},
  },
  reasons: {
    en:{work:"Work type does not match this program.",year1:"At least 1 year of relevant work is required.",year2:"At least 2 years of relevant trade work is required.",recent3:"Canadian experience must be within the last 3 years.",recent5:"Trade experience must be within the last 5 years.",recent10:"Skilled work must be within the last 10 years.",teer:"The selected TEER does not meet this program's requirement.",lang7:"CLB/NCLC 7 in all four abilities is required.",langCec:"The language minimum depends on TEER and is not met by the selected result.",langTrade:"The trade-program language minimum is not met.",education:"A qualifying Canadian credential or foreign credential with ECA is required.",offerCert:"A valid 1-year job offer or Canadian trade certificate is required.",funds:"Settlement funds are generally required unless the official exemption applies.",quebec:"This federal program requires an intention to live outside Quebec.",fsw67:"The separate 67-point Federal Skilled Worker test is not calculated yet."},
    zh:{work:"工作类型不符合该项目。",year1:"需要至少 1 年相关工作经验。",year2:"需要至少 2 年相关技工经验。",recent3:"加拿大工作经验须在最近 3 年内取得。",recent5:"技工经验须在最近 5 年内取得。",recent10:"技术工作经验须在最近 10 年内取得。",teer:"所选 TEER 不符合该项目要求。",lang7:"四项能力均须达到 CLB/NCLC 7。",langCec:"语言最低要求取决于 TEER，所选成绩未达到对应门槛。",langTrade:"未达到联邦技工计划的最低语言要求。",education:"须有合资格加拿大证书，或境外学历加 ECA。",offerCert:"须有至少一年的有效工作邀请，或加拿大技工资格证书。",funds:"除非满足官网例外，该项目通常要求安家资金证明。",quebec:"该联邦项目要求申请人计划居住在魁北克以外。",fsw67:"本工具尚未计算联邦技术工人的独立 67 分甄选因素。"},
  },
};
