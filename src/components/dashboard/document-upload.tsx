"use client";

import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import mongoose from "mongoose";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

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
  const [file, setFile] = useState<File | null>();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);
    const id = new mongoose.Types.ObjectId().toString();
    if (!file) {
      return toast({ title: "Please Select the file" });
    }

    try {
      const formData = new FormData();
      formData.append("pdf_file", file);
      formData.append("pdf_id", id);

      const uploadedRes = await axios.post(
        "http://localhost:8000/app1/upload_pdf/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(uploadedRes);

      if (uploadedRes.statusText === "OK") {
        const uploaded_data = uploadedRes.data;

        if (!uploaded_data.pdf_id || !uploaded_data.file_url) {
          return toast({ title: "Error Occurred", variant: "destructive" });
        }

        const res = await axios.post("/api/docs/", {
          id: uploaded_data?.pdf_id,
          name: name || file.name,
          url: uploaded_data?.file_url,
          chatInitiate: appType === "2",
        });

        if (res.data.success) {
          toast({ title: "Document has successfully been saved" });
          if (appType !== "2") {
            const gen_doc_res = await axios.get(
              `/api/ai/app${appType}/${uploaded_data?.pdf_id}`
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
          return router.push(`/app${appType}/${uploaded_data?.pdf_id}`);
        } else {
          console.log(res);
        }
      }
    } catch (err) {
      console.log(err);
      return toast({ title: "Error Occurred" });
    } finally {
      setLoading(false);
      setFile(null);
    }
  }

  return (
    <ScrollArea className="col-span-5 ">
      <div className="border-b w-full p-4 font-semibold text-md">{headTxt}</div>
      <div className="w-full h-full p-8 space-y-4">
        <p className="text-xl">Uplad a file to get started</p>
        <Input
          type="file"
          className="w-1/3"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setFile(file);
          }}
        />
        <Input
          className="w-1/3"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Give a name for the conversation"
        />
        <Button disabled={loading} onClick={handleSubmit}>
          Upload
        </Button>
      </div>
      <div className="mt-[10vh] border-t p-8">
        <h1>{title}</h1>
        <p className="mt-5">{description} </p>
      </div>
    </ScrollArea>
  );
};

export default DocUpload;
