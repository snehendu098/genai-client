import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Import, PlusCircle, Trash2, X } from "lucide-react";
import React from "react";

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

type Props = {
  categories: Category[];
  updateSubcategoryName: Function;
  updateQuestionText: Function;
  removeQuestion: Function;
  updateOptionText: Function;
  updateOptionScore: Function;
  setCategories: any;
  addOption: Function;
  addQuestion: Function;
  addSubcategory: Function;
  setImportingForCategory: any;
  setImportingForSubcategory: any;
  importText: string;
  setImportText: any;
  importedQuestions: Question[];
  appendImportedQuestions: any;
};

const CategorizedQuestions = ({
  categories,
  updateQuestionText,
  setImportText,
  updateSubcategoryName,
  removeQuestion,
  updateOptionText,
  updateOptionScore,
  setCategories,
  setImportingForCategory,
  setImportingForSubcategory,
  importText,
  addQuestion,
  addOption,
  appendImportedQuestions,
  importedQuestions,
  addSubcategory,
}: Props) => {
  return (
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
                                                  c.subcategories.map((sc) => {
                                                    if (
                                                      sc.id === subcategory.id
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
                                                  }),
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
                          <SheetContent className="min-w-[40vw]">
                            <ScrollArea className="px-4 h-screen pb-10">
                              <>
                                <SheetHeader>
                                  <SheetTitle>Import Questions</SheetTitle>
                                  <SheetDescription>
                                    Enter questions and options, one per line.
                                  </SheetDescription>
                                </SheetHeader>

                                <div className="grid gap-4 py-4 h-auto">
                                  <Textarea
                                    value={importText}
                                    onChange={(e) =>
                                      setImportText(e.target.value)
                                    }
                                    className="min-h-[200px]"
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
                              </>
                            </ScrollArea>
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
  );
};

export default CategorizedQuestions;
