"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IQuestion } from "@/context/template-provider";
import React, { useCallback, useEffect, useState } from "react";

type Options = {
  mainCate: string;
};

const QuestionAnswer = ({ mainCate }: Options) => {
  const [subCategory, setSubCategory] = useState<string>("");
  const [rawQuestions, setRawQuestions] = useState<string>("");
  const [parsedQuestions, setParsedQuestions] = useState<string[]>([]);
  const [parsedOptions, setParsedOptions] = useState<any[]>([]); // Initialize as an array of arrays

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
        <Button className="flex items-center">Create</Button>
      </div>
      <div className="mt-6 w-full grid grid-cols-2 gap-4">
        {/* TODO: Ui to do the subcategory part */}
        <Textarea
          className="min-h-[60vh]"
          value={rawQuestions}
          onChange={(e) => setRawQuestions(e.currentTarget.value)}
        />
        <div className="w-full h-auto">
          <h1>Preview Window</h1>

          {parsedQuestions.map((item: any, questionIndex: number) => (
            <div
              className="w-full rounded-md my-3 p-2 px-6 bg-white/5"
              key={questionIndex}
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
                      placeholder="0"
                      type="number"
                      value={option.score}
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
                      >
                        Add More
                      </Button>
                      <Button
                        variant={"destructive"}
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
      </div>
      <Button
        className="mt-8"
        onClick={() => {
          console.log("q", parsedQuestions);
          console.log("o", parsedOptions);
        }}
      >
        Hello
      </Button>
    </>
  );
};

export default QuestionAnswer;
