"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2, ChevronDown, Save, X, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { v4 } from "uuid";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

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

export default function Component() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "environment", name: "Environment", subcategories: [] },
    { id: "social", name: "Social", subcategories: [] },
    { id: "governance", name: "Governance", subcategories: [] },
  ]);
  const [publishedData, setPublishedData] = useState<string>("");
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

  const transformDataForPublish = () => {
    const transformedData: Record<string, Record<string, any[]>> = {};

    categories.forEach((category) => {
      transformedData[category.name] = {};
      category.subcategories.forEach((subcategory) => {
        transformedData[category.name][subcategory.name] =
          subcategory.questions.map((question) => ({
            question: question.text,
            opts: question.options.map((option) => ({
              opt_content: option.text,
              score: option.score,
            })),
          }));
      });
    });

    return transformedData;
  };

  const handlePublish = () => {
    const data = transformDataForPublish();
    setPublishedData(JSON.stringify(data, null, 2));
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

    // lines.forEach((line) => {
    //   if (!line.startsWith(" ") && !line.startsWith("\t")) {
    //     if (currentQuestion) {
    //       questions.push(currentQuestion);
    //     }
    //     currentQuestion = {
    //       id: v4(),
    //       text: line.trim(),
    //       options: [],
    //     };
    //   } else if (currentQuestion) {
    //     currentQuestion.options.push({
    //       id: v4(),
    //       text: line.trim(),
    //       score: 0,
    //     });
    //   }
    // });

    // if (currentQuestion) {
    //   questions.push(currentQuestion);
    // }

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

  useEffect(() => {
    handleImportQuestions();
  }, [importText]);

  return (
    <div className="container mx-auto p-4 space-y-8 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-6 ">Create Template</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={handlePublish}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background text-foreground">
            <DialogHeader>
              <DialogTitle>Published Data</DialogTitle>
            </DialogHeader>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-muted-foreground">
              {publishedData}
            </pre>
          </DialogContent>
        </Dialog>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {categories.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="border-none"
          >
            <AccordionTrigger className="px-6 py-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between w-full">
                <span className="text-xl font-semibold ">{category.name}</span>
                <ChevronDown className="h-5 w-5  transition-transform duration-200" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="mt-4 space-y-4">
              <AnimatePresence>
                {category.subcategories.map((subcategory) => (
                  <motion.div
                    key={subcategory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow duration-200">
                      <CardContent className="p-0">
                        <div className="bg-blue-500 p-4">
                          <Input
                            value={subcategory.name}
                            onChange={(e) =>
                              updateSubcategoryName(
                                category.id,
                                subcategory.id,
                                e.target.value
                              )
                            }
                            placeholder="Subcategory name"
                            className="font-bold text-lg bg-white/10 border-white/20 text-white placeholder-white/50"
                          />
                        </div>
                        <div className="p-4 space-y-4">
                          <AnimatePresence>
                            {subcategory.questions.map((question) => (
                              <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="bg-muted rounded-lg p-4 shadow-inner"
                              >
                                <div className="flex items-center space-x-2 mb-3">
                                  <Label
                                    htmlFor={`question-${question.id}`}
                                    className="text-sm font-medium "
                                  >
                                    Question
                                  </Label>
                                  <Input
                                    // id={`question-${question.id}`}
                                    value={question.text}
                                    onChange={(e) =>
                                      updateQuestionText(
                                        category.id,
                                        subcategory.id,
                                        question.id,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter question"
                                  />

                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      removeQuestion(
                                        category.id,
                                        subcategory.id,
                                        question.id
                                      )
                                    }
                                    className="text-muted-foreground hover:text-red-400 transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  {question.options.map((option) => (
                                    <motion.div
                                      key={option.id}
                                      className="flex items-center space-x-2 bg-card rounded-md p-2 shadow-sm"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <Input
                                        value={option.text}
                                        onChange={(e) =>
                                          updateOptionText(
                                            category.id,
                                            subcategory.id,
                                            question.id,
                                            option.id,
                                            e.target.value
                                          )
                                        }
                                        placeholder="Enter option"
                                        className="flex-grow bg-background text-foreground"
                                      />
                                      <Input
                                        type="number"
                                        value={option.score}
                                        onChange={(e) =>
                                          updateOptionScore(
                                            category.id,
                                            subcategory.id,
                                            question.id,
                                            option.id,
                                            Number(e.target.value)
                                          )
                                        }
                                        placeholder="Score"
                                        className="w-20 bg-background text-foreground"
                                        min={0}
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          setCategories(
                                            categories.map((c) => {
                                              if (c.id === category.id) {
                                                return {
                                                  ...c,
                                                  subcategories:
                                                    c.subcategories.map(
                                                      (sc) => {
                                                        if (
                                                          sc.id ===
                                                          subcategory.id
                                                        ) {
                                                          return {
                                                            ...sc,
                                                            questions:
                                                              sc.questions.map(
                                                                (q) => {
                                                                  if (
                                                                    q.id ===
                                                                    question.id
                                                                  ) {
                                                                    return {
                                                                      ...q,
                                                                      options:
                                                                        q.options.filter(
                                                                          (o) =>
                                                                            o.id !==
                                                                            option.id
                                                                        ),
                                                                    };
                                                                  }
                                                                  return q;
                                                                }
                                                              ),
                                                          };
                                                        }
                                                        return sc;
                                                      }
                                                    ),
                                                };
                                              }
                                              return c;
                                            })
                                          );
                                        }}
                                        className="text-muted-foreground hover:text-red-400 transition-colors"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">
                                          Delete option
                                        </span>
                                      </Button>
                                    </motion.div>
                                  ))}
                                </div>
                                <Button
                                  onClick={() =>
                                    addOption(
                                      category.id,
                                      subcategory.id,
                                      question.id
                                    )
                                  }
                                  variant="outline"
                                  size="sm"
                                  className="mt-3 bg-blue-600 text-white hover:bg-blue-700"
                                >
                                  <PlusCircle className="h-4 w-4 mr-2" />
                                  Add Option
                                </Button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          <Button
                            onClick={() =>
                              addQuestion(category.id, subcategory.id)
                            }
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Question
                          </Button>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                onClick={() => {
                                  setImportingForCategory(category.id);
                                  setImportingForSubcategory(subcategory.id);
                                }}
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                <Import className="h-4 w-4 mr-2" />
                                Import Questions
                              </Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Import Questions</SheetTitle>
                                <SheetDescription>
                                  Enter questions and options, one per line.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <Textarea
                                  value={importText}
                                  onChange={(e) =>
                                    setImportText(e.target.value)
                                  }
                                  placeholder=""
                                  className="h-[200px]"
                                />
                                {/* <Button onClick={handleImportQuestions}>
                                  Preview
                                </Button> */}
                                {importedQuestions.length > 0 && (
                                  <div className="border p-4 rounded-md">
                                    <h3 className="font-bold text-xl mb-2">
                                      Preview:
                                    </h3>
                                    {importedQuestions.map((q, index) => (
                                      <div
                                        key={index}
                                        className="mb-4 p-2 bg-gray-50/5 rounded-md"
                                      >
                                        <p className="font-semibold mb-2 text-lg">
                                          {q.text}
                                        </p>
                                        <ul>
                                          {q.options.map((opt, optIndex) => (
                                            <li
                                              className="bg-gray-50/15 rounded-md p-2 mb-2 pl-5"
                                              key={optIndex}
                                            >
                                              {opt.text}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button onClick={appendImportedQuestions}>
                                    Import
                                  </Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button
                onClick={() => addSubcategory(category.id)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Subcategory
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
