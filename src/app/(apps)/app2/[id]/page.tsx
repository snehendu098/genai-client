"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import ChatShow from "@/components/dashboard/chat-show";
import DocModel from "@/models/Doc.model";
import { baseUrl } from "@/constants";
import { headers } from "next/headers";

const App = ({ params }: { params: { id: string } }) => {
  const docId = params.id;
  const [rawQuestionBunch, setRawQuestionBunch] = useState<string>("");
  const [rawQuestionArray, setRawQuestionArray] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [qna, setQna] = useState<any[]>([]);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [singleQues, setSingleQues] = useState<string>();

  const [singleChatLoading, setSingleChatLoading] = useState<boolean>(false);
  const [combinedIds, setCombinedIds] = useState<string>("");

  const parseQuestionToArray = useCallback(() => {
    setRawQuestionArray(
      rawQuestionBunch.split("\n").filter((item) => item !== "")
    );
  }, [rawQuestionBunch]);

  useEffect(() => {
    parseQuestionToArray();
  }, [rawQuestionBunch, parseQuestionToArray]);

  const getChats = async () => {
    try {
      const { data } = await axios.get(`/api/ai/app2/getchat/${docId}`);

      // console.log("getdata", data);

      if (data.success) {
        setQna(data.chat);
        // console.log(qna);
      }
    } catch (err) {
      console.log("get chat err", err);
      toast({ title: "Failed to get chats", variant: "destructive" });
    }
  };

  const handleUploadBulk = async () => {
    setLoading(true);
    try {
      for (let i = rawQuestionArray.length - 1; i >= 0; i--) {
        const item = rawQuestionArray[i];
        // TODO: ai call for chat answer
        const form = new FormData();
        form.append("combined_id", combinedIds);
        form.append("query", item);
        const answerData = await axios.post(`${baseUrl}/app1/esgChat/`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { data } = await axios.post("/api/ai/app2", {
          docId,
          question: item,
          answer: answerData.data.response || "",
        });

        if (!data.success) {
          toast({
            title: "Error in question",
            description: `Error in question: ${item}`,
            variant: "destructive",
          });
        }
      }
      toast({ title: "All questions have been uploaded" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error occurred while uploading question bunch",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRawQuestionBunch("");
      setRawQuestionArray([]);
      await getChats();
      setSheetOpen(false);
    }
  };

  const postSingle = async () => {
    try {
      setSingleChatLoading(true);
      let arr: any = [];

      if (!singleQues) {
        return toast({ title: "No Question Entered", variant: "destructive" });
      }

      // TODO: ai call to get chat answer
      const form = new FormData();
      console.log(combinedIds);
      form.append("combined_id", combinedIds);
      form.append("query", singleQues);
      const answerData = await axios.post(`${baseUrl}/app1/esgChat/`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = await axios.post("/api/ai/app2", {
        docId,
        question: singleQues,
        answer: answerData.data.response || "",
      });

      if (data.success) {
        arr.push({ content: data.chat.question, type: 0 });

        // console.log("arr1", arr);

        arr.push({
          content: data.chat.answer,
          type: 1,
          id: data.chat._id,
          helpful: null,
        });

        setQna((prev) => [...arr, ...prev]);
      } else {
        return toast({ title: "Error Occurred while uploading" });
      }
    } catch (err) {
      console.log(err);
      toast({ title: "Error Uploading Question" });
    } finally {
      setSingleChatLoading(false);
    }
  };

  const loadChat = async () => {
    const docsData = await axios.get(`/api/docs/${docId}`);
    if (docsData.data?.docs && docsData.data.docs.length > 0) {
      const allIds = docsData.data.docs.map((item: any) => item.id.toString());

      // TODO: Chat Load (done)
      const formData = new FormData();
      formData.append("pdf_ids", JSON.stringify(allIds));

      const { data } = await axios.post(
        `${baseUrl}/app1/esgChatLoad/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);

      if (data["Docs_index"]) {
        setCombinedIds(data["Docs_index"]);
        getChats();
      } else {
        return toast({ title: "Error Occurred" });
      }
    }
  };

  useState(() => {
    loadChat();
  });

  useEffect(() => {
    console.log("cl", combinedIds);
  }, [combinedIds]);

  return (
    <div className="pt-40">
      {combinedIds.length > 0 ? (
        <>
          {qna.length > 0 &&
            qna.map((item, idx: number) => (
              <React.Fragment key={idx}>
                <ChatShow item={item} />
              </React.Fragment>
            ))}
          <div className="absolute z-10 bg-background flex flex-col top-5 left-0 right-5 px-4">
            <Textarea
              className="w-full min-h-20"
              placeholder="Ask a Question"
              value={singleQues}
              onChange={(e) => setSingleQues(e.currentTarget.value)}
            />
            <div className="w-full mt-4 flex flex-row-reverse">
              <Button disabled={singleChatLoading} onClick={postSingle}>
                Ask Question
              </Button>
              {/* sheet for bulk upload */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                        className="min-h-40 h-auto mt-5 active:outline-none"
                        placeholder={"question 1\nquestion 2\nquestion 3"}
                        value={rawQuestionBunch}
                        onChange={(e) =>
                          setRawQuestionBunch(e.currentTarget.value)
                        }
                      />
                      <div className="mt-6 overflow-y-auto">
                        {rawQuestionArray.length > 0 && (
                          <>
                            <p className="text-xl font-semibold">Preview</p>
                            <div className="w-full flex flex-col space-y-4 mt-4">
                              {rawQuestionArray.map(
                                (item: string, idx: number) => (
                                  <div
                                    key={idx}
                                    className="p-2 rounded-md text-sm border"
                                  >
                                    {item}
                                  </div>
                                )
                              )}
                            </div>
                            <Button
                              disabled={loading}
                              onClick={handleUploadBulk}
                              className="mt-6"
                            >
                              Upload Question Bunch
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading the vector index...</h1>
      )}
    </div>
  );
};

export default App;
