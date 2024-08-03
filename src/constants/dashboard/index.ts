export const dummyPDFLink = "https://gbihr.org/images/docs/test.pdf";

export interface TopicAssessment {
  [key: string]: {
    [subhead: string]: string[];
  };
}

export const topicAssessmentDummyData = {
  Environmental: {
    "Water Sustainibility": [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    ],
    "Waste Management": [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    ],
    "Climate Comments": [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    ],
  },
  Social: {
    "Subheading 1": [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    ],
    "Subheading 2": [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    ],
  },
};

interface IndicatorGRIAndAssessment {
  ind: string;
  gri: string;
  assessment: string;
}

export interface PrincipleChecklist {
  brsr: string;
  sdg: string;
  indicator_gri_and_assessment: IndicatorGRIAndAssessment[];
}

export const principlesChecklistDummy: PrincipleChecklist[] = [
  {
    brsr: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    sdg: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    indicator_gri_and_assessment: [
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
    ],
  },
  {
    brsr: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    sdg: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    indicator_gri_and_assessment: [
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
    ],
  },
  {
    brsr: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    sdg: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    indicator_gri_and_assessment: [
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
      { ind: "lorem1", gri: "lorem2", assessment: "lorem3" },
    ],
  },
];

export const docsDummy = [
  { url: dummyPDFLink, id: "jdbbsidfy3q4y83y89rt8", type: 1, name: "Doc 1" },
  { url: dummyPDFLink, id: "ajhgbfiuahbefgiuhbsehu", type: 2, name: "Doc 2" },
];

export const broadDesc = {
  "/app1": [
    {
      type: 0,
      content:
        "Quikable’s AI evaluates annual reports, and sustainability reports and summarizes the material topics as per Enterprise's requirements",
    },
    { type: 1, content: "Summarize material topics of your choice in minutes" },
    {
      type: 1,
      content: "Provides sources as evidence for compliance or auditing",
    },
    { type: 1, content: "GRI cross-referencing is included" },
    {
      type: 0,
      content:
        "Currently, the tool supports 6-8 ESG topics like Water, Waste, Climate Change, Diversity, Human rights and others. It is configurable",
    },
  ],
  "/app2": [
    {
      type: 0,
      content:
        "Quikable’s ESG Questionnaire Assistant leverages generative AI to extract insights from Annual Reports, Financial Statements, CSR Documents, and website URLs.",
    },
    {
      type: 1,
      content:
        "Use sample ready-to-use questionnaire templates (e.g. as per BRSR, GRI, CSRD standards)",
    },
    { type: 1, content: "Create and manage your own set of questions" },
    {
      type: 1,
      content: "Export the QnA document and you are ready to respond",
    },
  ],
  "/app3": [
    {
      type: 0,
      content:
        "Company policies are under increasing regulatory scrutiny. Quikable AI identifies gaps in companies' policies, risk analysis, and competitor study:",
    },
    {
      type: 1,
      content: "Get a detailed gap analysis based on SEBI’s BRSR framework",
    },
    {
      type: 1,
      content: "Provides sources as evidence for compliance or auditing",
    },
    { type: 1, content: "GRI, SDG cross-referencing is included" },
  ],
  "/app4": [
    {
      type: 0,
      content:
        "An autonomous ESG agent designed for your ESG research to provide rapid insights and comprehensive reports. It takes care of everything from accurate source gathering to organizing research results",
    },
    { type: 1, content: "Get comprehensive Google research with AI" },
    {
      type: 1,
      content: "Accurate information gathering from relevant sources",
    },
    {
      type: 1,
      content:
        "Collaborate with your team members and easily share your research findings",
    },
  ],
};
