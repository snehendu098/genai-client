"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useTemplateContext } from "@/context/template-provider";
import React, { useCallback, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Options = {
  mainCate: string;
};

const QuestionAnswer = ({ mainCate }: Options) => {
  const [subCategory, setSubCategory] = useState<string>("");
  const [rawQuestions, setRawQuestions] = useState<string>("");
  const [parsedQuestions, setParsedQuestions] = useState<string[]>([]);
  const [parsedOptions, setParsedOptions] = useState<any[][]>([]); // Initialize as an array of arrays
  const { templateOptions, setTemplateOptions } = useTemplateContext();
  const [disableQuestionChange, setDisableQuestionChange] =
    useState<boolean>(false);
  const [disableOptionChange, setDisableOptionChange] =
    useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");

  const handleSave = () => {
    let subcateObject = [];

    // loop for creating questions for a particular subcategory
    for (let i = 0; i < parsedOptions.length; i++) {
      const optForSingleQue = parsedOptions[i];
      const correspondingQue = parsedQuestions[i];

      if (optForSingleQue.length > 1 && correspondingQue) {
        const filteredOptions = optForSingleQue.filter(
          (option) => option.opt_content !== ""
        );

        if (filteredOptions.length > 0) {
          let single: any = {};
          single["question"] = correspondingQue;
          single["opts"] = filteredOptions;
          subcateObject.push(single);
        }
      }
    }

    if (subcateObject.length > 0) {
      setTemplateOptions({
        ...templateOptions,
        [mainCate]: {
          ...templateOptions[mainCate],
          [subCategory]: subcateObject,
        },
      });

      setDisableQuestionChange(true);
      setDisableOptionChange(true);
    } else {
      toast({
        title: "Make sure you have done everything right",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (templateOptions[mainCate][subCategory]) {
      // console.log("po", parsedOptions);
      // console.log("t", templateOptions[mainCate][subCategory]);
      // console.log("pQ", parsedQuestions);
      let que: any[] = [];
      let opts: any[] = [];

      for (let i = 0; i < templateOptions[mainCate][subCategory].length; i++) {
        const item = templateOptions[mainCate][subCategory][i];
        que.push(item.question);
        opts.push(item.opts);
      }

      setParsedQuestions(que);
      setParsedOptions(opts);
    }
  }, [templateOptions, mainCate]);

  useEffect(() => {
    const questionArr = rawQuestions.split("\n").filter((item) => item !== "");
    setParsedQuestions(questionArr);
    setParsedOptions(questionArr.map(() => [{ opt_content: "", score: 0 }])); // Initialize options for each question
  }, [rawQuestions]);

  const handleAddOption = useCallback(
    (questionIndex: number) => {
      setParsedOptions((prevOptions) => {
        const newOption = { opt_content: "", score: 0 };
        const newOptions = JSON.parse(JSON.stringify(prevOptions));
        newOptions[questionIndex].push(newOption);
        return newOptions;
      });
    },
    [setParsedOptions]
  );

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    setParsedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[questionIndex] = newOptions[questionIndex].filter(
        (_: any, i: number) => i !== optionIndex
      );
      return newOptions;
    });
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string,
    type: "opt_content" | "score"
  ) => {
    setParsedOptions((prevOptions) => {
      prevOptions[questionIndex][optionIndex][type] = value;
      return [...prevOptions];
    });
  };

  return (
    <>
      <div className="flex items-center mt-6 ">
        <Input
          className="max-w-[20vw] mr-4"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          placeholder="Subcategory 1"
        />
        {/* <Button className="flex items-center">Create</Button> */}
      </div>
      {/* Ui to do the subcategory part */}
      <div className="mt-6 w-full">
        {!disableQuestionChange && (
          <Textarea
            className="min-h-[60vh]"
            value={rawQuestions}
            onChange={(e) => {
              setRawQuestions(e.currentTarget.value);
              console.log(templateOptions);
            }}
            disabled={disableQuestionChange}
          />
        )}

        {disableQuestionChange && (
          <div className="w-full h-auto">
            {parsedQuestions.length > 0 ? (
              <h1>Add Options</h1>
            ) : (
              <h1>Paste questions to Add Options</h1>
            )}
            {parsedQuestions.map((item: any, questionIndex: number) => (
              <div
                className="w-full rounded-md my-3 p-2 px-6 bg-white/5"
                key={questionIndex}
                id="singleQuestion"
              >
                <p className="text-lg font-semibold text-neutral-300">
                  Q: {item}
                </p>

                {parsedOptions[questionIndex].map(
                  (option: any, optionIndex: number) => (
                    <div
                      className="my-4 grid gap-4 grid-cols-3"
                      key={optionIndex}
                    >
                      <Input
                        id="option"
                        placeholder="option 1"
                        value={option.opt_content}
                        disabled={disableOptionChange}
                        onChange={(e) =>
                          handleOptionChange(
                            questionIndex,
                            optionIndex,
                            e.target.value,
                            "opt_content"
                          )
                        }
                      />
                      <Input
                        id="score"
                        placeholder="score"
                        type="number"
                        value={option.score}
                        disabled={disableOptionChange}
                        onChange={(e) =>
                          handleOptionChange(
                            questionIndex,
                            optionIndex,
                            e.target.value,
                            "score"
                          )
                        }
                      />
                      <div className="flex flex-row-reverse">
                        <Button
                          variant="secondary"
                          className="mx-4"
                          onClick={() => handleAddOption(questionIndex)}
                          disabled={disableOptionChange}
                        >
                          Add More
                        </Button>
                        <Button
                          variant={"destructive"}
                          disabled={disableOptionChange}
                          onClick={() =>
                            handleRemoveOption(questionIndex, optionIndex)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={alert.length > 0}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>{alert}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (disableQuestionChange) {
                  handleSave();
                }

                // if (!disableQuestionChange && !disableOptionChange) {
                //   console.log("h1");
                //   setDisableQuestionChange(true);
                // }

                // if (disableQuestionChange && !disableOptionChange) {
                //   console.log("h2");
                //   setDisableOptionChange(true);
                // }

                if (disableOptionChange && disableQuestionChange) {
                  setDisableOptionChange(false);
                  setDisableQuestionChange(false);
                }

                setAlert("");
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* save button */}
      <div className="flex mt-8 ">
        {!disableOptionChange && (
          <Button
            className="mr-4"
            disabled={subCategory.length === 0 || parsedQuestions.length === 0}
            onClick={() => {
              setAlert(
                "Once you go back, you might have to re-enter the options"
              );
            }}
          >
            {disableQuestionChange
              ? "Proceed to Next"
              : "Proceed to add option"}
          </Button>
        )}
        {disableQuestionChange && !disableOptionChange && (
          <Button>Go back to questions</Button>
        )}
        {disableOptionChange && (
          <Button
            onClick={() => {
              setAlert("The options you have entered might be removed");
            }}
            className=" bg-blue-400 hover:bg-blue-500 "
          >
            Edit
          </Button>
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
