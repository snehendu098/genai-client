export const dummyPDFLink = "https://gbihr.org/images/docs/test.pdf";

interface DummyDataTopicAssessment {
  [key: string]: {
    [subhead: string]: string[];
  };
}

export const topicAssessmentDummyData: DummyDataTopicAssessment = {
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

interface DataItem {
  brsr: string;
  sdg: string;
  indicator_gri_and_assessment: IndicatorGRIAndAssessment[];
}

export const principlesChecklistDummy: DataItem[] = [
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
