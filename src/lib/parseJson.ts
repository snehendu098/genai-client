type Option = {
  id: string;
  text: string;
  score: number;
};

type Question = {
  id: string;
  text: string;
  options: Option[];
};

type Subcategory = {
  id: string;
  name: string;
  questions: Question[];
};

type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
};

export function parseQuestions(input: any): Category[] {
  const categories = ["Environment", "Social", "Governance"];

  return categories.map((category) => {
    const categoryKey = category.toLowerCase();
    const subcategories: Subcategory[] = Object.keys(input[category] || {}).map(
      (subcategoryKey) => {
        const questions: Question[] = input[category][subcategoryKey].map(
          (questionObj: any, index: number) => {
            const options: Option[] = questionObj.opts.map(
              (opt: any, optIndex: number) => ({
                id: `${subcategoryKey.toLowerCase()}-opt-${index + 1}-${
                  optIndex + 1
                }`,
                text: opt.opt_content,
                score: opt.score,
              })
            );

            return {
              id: `${subcategoryKey.toLowerCase()}-q-${index + 1}`,
              text: questionObj.question,
              options: options,
            };
          }
        );

        return {
          id: subcategoryKey.toLowerCase().replace(/\s+/g, "-"),
          name: subcategoryKey,
          questions: questions,
        };
      }
    );

    return {
      id: categoryKey,
      name: category,
      subcategories: subcategories.length > 0 ? subcategories : [],
    };
  });
}

export type { Option, Question, Subcategory, Category };

// Example usage:
const input = {
  Environment: {
    hello: [
      {
        question: "que 1",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
        ],
      },
      {
        question: "que 2",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
          { opt_content: "opt3", score: 0 },
        ],
      },
    ],
    "hello 2": [
      {
        question: "que1",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
        ],
      },
      {
        question: "que2",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
        ],
      },
    ],
  },
  Social: {
    hello: [
      {
        question: "que1",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
        ],
      },
      {
        question: "que2",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
        ],
      },
    ],
  },
  Governance: {
    "hello 1": [
      {
        question: "que1",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
        ],
      },
      {
        question: "que2",
        opts: [
          { opt_content: "opt1", score: 1 },
          { opt_content: "opt2", score: 0 },
        ],
      },
    ],
  },
};

// console.log(parseQuestions(input));
