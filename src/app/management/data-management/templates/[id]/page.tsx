"use client";

import { useEffect, useState } from "react";
import { Save, GitPullRequestDraft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 } from "uuid";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import CategorizedQuestions from "@/components/management-framework/templates/categorized-questions";
import { parseQuestions } from "@/lib/parseJson";
import type { Category, Question } from "@/lib/parseJson";

// TODO: Context saving

export default function Component() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "environment", name: "Environment", subcategories: [] },
    { id: "social", name: "Social", subcategories: [] },
    { id: "governance", name: "Governance", subcategories: [] },
  ]);
  const [importText, setImportText] = useState(
    "que 1\nopt1\nopt2\n\nque 2\nopt1\nopt2\nopt3"
  );
  const [importedQuestions, setImportedQuestions] = useState<Question[]>([]);
  const [importingForCategory, setImportingForCategory] = useState<
    string | null
  >(null);
  const [importingForSubcategory, setImportingForSubcategory] = useState<
    string | null
  >(null);

  const [fetched, setFetched] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const addSubcategory = (categoryId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: [
              ...category.subcategories,
              { id: Date.now().toString(), name: "", questions: [] },
            ],
          };
        }
        return category;
      })
    );
  };

  const addQuestion = (categoryId: string, subcategoryId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.id === subcategoryId) {
                return {
                  ...subcategory,
                  questions: [
                    ...subcategory.questions,
                    {
                      id: Date.now().toString(),
                      text: "",
                      options: [
                        { id: v4(), text: "Yes", score: 1 },
                        { id: v4(), text: "No", score: 0 },
                      ],
                    },
                  ],
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  };

  const addOption = (
    categoryId: string,
    subcategoryId: string,
    questionId: string
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.id === subcategoryId) {
                return {
                  ...subcategory,
                  questions: subcategory.questions.map((question) => {
                    if (question.id === questionId) {
                      return {
                        ...question,
                        options: [
                          ...question.options,
                          { id: Date.now().toString(), text: "", score: 0 },
                        ],
                      };
                    }
                    return question;
                  }),
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  };

  const updateSubcategoryName = (
    categoryId: string,
    subcategoryId: string,
    name: string
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.id === subcategoryId) {
                return { ...subcategory, name };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  };

  const updateQuestionText = (
    categoryId: string,
    subcategoryId: string,
    questionId: string,
    text: string
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.id === subcategoryId) {
                return {
                  ...subcategory,
                  questions: subcategory.questions.map((question) => {
                    if (question.id === questionId) {
                      return { ...question, text };
                    }
                    return question;
                  }),
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  };

  const updateOptionText = (
    categoryId: string,
    subcategoryId: string,
    questionId: string,
    optionId: string,
    text: string
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.id === subcategoryId) {
                return {
                  ...subcategory,
                  questions: subcategory.questions.map((question) => {
                    if (question.id === questionId) {
                      return {
                        ...question,
                        options: question.options.map((option) => {
                          if (option.id === optionId) {
                            return { ...option, text };
                          }
                          return option;
                        }),
                      };
                    }
                    return question;
                  }),
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  };

  const updateOptionScore = (
    categoryId: string,
    subcategoryId: string,
    questionId: string,
    optionId: string,
    score: number
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.id === subcategoryId) {
                return {
                  ...subcategory,
                  questions: subcategory.questions.map((question) => {
                    if (question.id === questionId) {
                      return {
                        ...question,
                        options: question.options.map((option) => {
                          if (option.id === optionId) {
                            return { ...option, score };
                          }
                          return option;
                        }),
                      };
                    }
                    return question;
                  }),
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  };

  const removeQuestion = (
    categoryId: string,
    subcategoryId: string,
    questionId: string
  ) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.id === subcategoryId) {
                return {
                  ...subcategory,
                  questions: subcategory.questions.filter(
                    (question) => question.id !== questionId
                  ),
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  };

  const parseImportText = (text: string): Question[] => {
    const lines = text.split("\n\n").filter((line) => line.trim() !== "");
    const questions: Question[] = [];

    for (let i = 0; i < lines.length; i++) {
      let currentQuestion: Question | null = null;
      const element = lines[i].split("\n").filter((line) => line.trim() !== "");
      for (let j = 0; j < element.length; j++) {
        const item = element[j];
        if (j === 0) {
          currentQuestion = {
            id: v4(),
            text: item.trim(),
            options: [],
          };
        } else {
          currentQuestion?.options.push({
            id: v4(),
            text: item.trim(),
            score: j === 1 ? 1 : 0,
          });
        }
      }

      if (currentQuestion) {
        questions.push(currentQuestion);
      }
    }
    return questions;
  };

  const handleImportQuestions = () => {
    const parsedQuestions = parseImportText(importText);
    setImportedQuestions(parsedQuestions);
  };

  const appendImportedQuestions = () => {
    if (importingForCategory && importingForSubcategory) {
      setCategories(
        categories.map((category) => {
          if (category.id === importingForCategory) {
            return {
              ...category,
              subcategories: category.subcategories.map((subcategory) => {
                if (subcategory.id === importingForSubcategory) {
                  return {
                    ...subcategory,
                    questions: [...subcategory.questions, ...importedQuestions],
                  };
                }
                return subcategory;
              }),
            };
          }
          return category;
        })
      );
    }
    setImportText("");
    setImportedQuestions([]);
    setImportingForCategory(null);
    setImportingForSubcategory(null);
  };

  const transformDataForPublish = () => {
    const transformedData: Record<string, Record<string, any[]>> = {};

    categories.forEach((category) => {
      transformedData[category.name] = {};

      category.subcategories.forEach((subcategory) => {
        if (subcategory.name && subcategory.questions.length > 0) {
          const validQuestions = subcategory.questions
            .map((question) => ({
              question: question.text,
              opts: question.options.map((option) => ({
                opt_content: option.text,
                score: option.score,
              })),
            }))
            .filter((question) => question.opts.length > 0);

          if (validQuestions.length > 0) {
            transformedData[category.name][subcategory.name] = validQuestions;
          }
        }
      });

      // If no valid subcategories, set the category to an empty object
      if (Object.keys(transformedData[category.name]).length === 0) {
        transformedData[category.name] = {};
      }
    });

    return transformedData;
  };

  const handlePublish = async (publish: boolean) => {
    try {
      const transformed = transformDataForPublish();

      const id = pathname.split("/templates/")[1];
      const { data } = await axios.post("/api/management/templates/create", {
        id,
        publish,
        questionsJson: JSON.stringify(transformed),
      });

      // console.log("dat", data);

      if (data.success) {
        toast({
          title: "Successfully created",
        });
        router.back();
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Error while saving/publishing template",
      });
    }
  };

  const getInitialData = async () => {
    try {
      const id = pathname.split("/templates/")[1];

      const { data } = await axios.get(`/api/management/templates/${id}`);

      if (
        data.success &&
        data.templateData &&
        data.templateData.questionsJson
      ) {
        // console.log(parseQuestions(data.templateData.questionsJson));
        setCategories(parseQuestions(data.templateData.questionsJson));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFetched(false);
    }
  };

  useEffect(() => {
    handleImportQuestions();
  }, [importText]);

  useEffect(() => {
    if (!fetched) {
      getInitialData();
    }
  }, [fetched]);

  return (
    <div className="container mx-auto p-4 space-y-8 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-6 ">Create Template</h1>
        <div className="grid grid-cols-2 gap-4">
          {/* <Dialog>
            <DialogTrigger asChild> */}
          <Button
            onClick={() => handlePublish(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Publish
          </Button>
          {/* </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background text-foreground">
              <DialogHeader>
                <DialogTitle>Published Data</DialogTitle>
              </DialogHeader>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-muted-foreground">
                {publishedData}
              </pre>
            </DialogContent>
          </Dialog> */}

          <Button
            onClick={() => handlePublish(false)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <GitPullRequestDraft className="h-4 w-4 mr-2" /> Save As Draft
          </Button>
        </div>
      </div>
      <CategorizedQuestions
        categories={categories}
        updateSubcategoryName={updateSubcategoryName}
        updateQuestionText={updateQuestionText}
        addOption={addOption}
        addQuestion={addQuestion}
        addSubcategory={addSubcategory}
        appendImportedQuestions={appendImportedQuestions}
        importText={importText}
        importedQuestions={importedQuestions}
        removeQuestion={removeQuestion}
        setCategories={setCategories}
        setImportText={setImportText}
        setImportingForCategory={setImportingForCategory}
        setImportingForSubcategory={setImportingForSubcategory}
        updateOptionScore={updateOptionScore}
        updateOptionText={updateOptionText}
      />
    </div>
  );
}
