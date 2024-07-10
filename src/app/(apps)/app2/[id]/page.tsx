"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback, useEffect, useState } from "react";

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
import { ScrollArea } from "@/components/ui/scroll-area";

const App = ({ params }: { params: { id: string } }) => {
  const docId = params.id;
  const [rawQuestionBunch, setRawQuestionBunch] = useState<string>("");
  const [rawQuestionArray, setRawQuestionArray] = useState<string[]>([]);

  const parseQuestionToArray = useCallback(() => {
    setRawQuestionArray(
      rawQuestionBunch.split("\n").filter((item) => item !== "")
    );
  }, [rawQuestionBunch]);

  useEffect(() => {
    parseQuestionToArray();
  }, [rawQuestionBunch]);

  return (
    <div className="pb-40">
      <div className="absolute flex flex-col bottom-5 left-0 right-0 px-4">
        <Textarea className="w-full min-h-20" placeholder="Ask a Question" />
        <div className="w-full mt-4 flex flex-row-reverse">
          <Button>Ask Question</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} className="mx-4">
                Ask In Bunch
              </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[50vw] grid grid-cols-1 gap-4">
              <ScrollArea className="px-4">
                <SheetHeader>
                  <SheetTitle>Ask Question in bunch</SheetTitle>
                  <SheetDescription>
                    Add multiple questions separated by a new line
                  </SheetDescription>
                </SheetHeader>
                <div>
                  <Textarea
                    id="name"
                    className="min-h-40 mt-5"
                    placeholder={"question 1\nquestion 2\nquestion 3"}
                    value={rawQuestionBunch}
                    onChange={(e) => setRawQuestionBunch(e.currentTarget.value)}
                  />
                  <div className="mt-6 overflow-y-auto">
                    {rawQuestionArray.length > 0 && (
                      <>
                        <p className="text-xl font-semibold">Preview</p>
                        <div className="w-full flex flex-col space-y-4 mt-4">
                          {rawQuestionArray.map((item: string, idx: number) => (
                            <div
                              key={idx}
                              className="p-2 rounded-md text-sm border"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                        <Button className="mt-6">Upload Quesion Bunch</Button>
                      </>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default App;
