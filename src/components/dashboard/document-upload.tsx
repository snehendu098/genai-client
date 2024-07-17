"use client";

import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import mongoose from "mongoose";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { SingleDoc } from "@/models/Doc.model";

const DocUpload = ({
  headTxt,
  title,
  description,
  appType,
}: {
  headTxt: string;
  title: string;
  description: string;
  appType: string;
}) => {
  const [files, setFiles] = useState<FileList | null>();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);

    if (!files) {
      return toast({ title: "Please Select the file" });
    }

    try {
      let arr: SingleDoc[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const id = new mongoose.Types.ObjectId().toString();
        const formData = new FormData();
        formData.append("pdf_file", file);
        formData.append("pdf_id", id);

        // TODO: upload pdf
        const uploadedRes = await axios.post(
          `http://localhost:8000/app1/upload_pdf_app${appType}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // console.log(uploadedRes);

        if (uploadedRes.statusText === "OK") {
          const uploaded_data = uploadedRes.data;

          if (!uploaded_data.pdf_id || !uploaded_data.file_url) {
            return toast({ title: "Error Occurred", variant: "destructive" });
          }

          arr.push({
            name: file.name,
            url: uploaded_data?.file_url,
            id: uploaded_data?.pdf_id,
          });
        }
      }

      const res = await axios.post("/api/docs/", {
        name: name,
        docs: arr,
        chatInitiate: appType === "2",
      });

      if (res.data.success) {
        toast({ title: "Document has successfully been saved" });
        if (appType !== "2") {
          const gen_doc_res = await axios.get(
            `/api/ai/app${appType}/${res?.data?.id}`
          );
          if (!gen_doc_res.data.success) {
            return toast({
              title: "Error Occurred",
              description:
                "Please reload the page and open the file from the sidebar to view it",
              variant: "destructive",
            });
          }
        }
        // data saving to the database
        return router.push(`/app${appType}/${res.data?.id}`);
      } else {
        // console.log(res);
        return toast({ title: "Error Occurred while uplloading docs" });
      }
    } catch (err) {
      console.log(err);
      toast({ title: "Error Occurred" });
    } finally {
      setLoading(false);
      setFiles(null);
    }
  }

  return (
    <ScrollArea className="col-span-5 h-[calc(100vh-4rem)]">
      <div className="h-[calc((100vh-4rem)/2)]">
        <div className="border-b w-full p-4 font-semibold text-md">
          {headTxt}
        </div>
        <div className="w-full h-full p-8 space-y-4">
          <p className="text-xl">Upload a file to get started</p>
          <Input
            type="file"
            className="w-1/3"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files ? e.target.files : null;
              setFiles(file);
            }}
            multiple={appType === "2"}
          />
          <Input
            className="w-1/3"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Give a name for the conversation"
          />
          <Button disabled={loading || !name} onClick={handleSubmit}>
            Upload
          </Button>
        </div>
      </div>

      <div className="h-[calc((100vh-4rem)/2)] bg-primary-foreground border-t p-8">
        <h1>{title}</h1>
        <p className="mt-5">{description} </p>
      </div>
    </ScrollArea>
  );
};

export default DocUpload;
