"use client";

import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { SingleDoc } from "@/models/Doc.model";
import { baseUrl } from "@/constants";
import { Loader2 } from "lucide-react";
import { broadDesc } from "@/constants/dashboard";

interface BroadDescItem {
  type: number;
  content: string;
}

interface BroadDesc {
  [key: string]: BroadDescItem[];
}

interface DocUploadProps {
  headTxt: string;
  title: string;
  appType: string;
}

const DocUpload: React.FC<DocUploadProps> = ({ headTxt, title, appType }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async () => {
    setLoading(true);

    if (!files) {
      toast({ title: "Please select a file" });
      setLoading(false);
      return;
    }

    try {
      const arr: SingleDoc[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("pdf_file", file);
        formData.append("pdf_id", new Date().toISOString());

        const uploadedRes = await axios.post(
          `${baseUrl}/app1/upload_pdf/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );

        if (uploadedRes.status === 200) {
          const { pdf_id, file_url } = uploadedRes.data;

          if (!pdf_id || !file_url) {
            toast({ title: "Error occurred", variant: "destructive" });
            setLoading(false);
            return;
          }

          arr.push({
            name: file.name,
            url: file_url,
            id: pdf_id,
          });
        }
      }

      const res = await axios.post("/api/docs/", {
        name,
        docs: arr,
        chatInitiate: appType === "2",
      });

      if (res.data.success) {
        toast({ title: "Document has been successfully saved" });
        if (appType !== "2") {
          const genDocRes = await axios.get(
            `/api/ai/app${appType}/${res.data.id}`,
          );
          if (!genDocRes.data.success) {
            toast({
              title: "Error occurred",
              description:
                "Please reload the page and open the file from the sidebar to view it",
              variant: "destructive",
            });
          }
        }
        router.push(`/app${appType}/${res.data.id}`);
      } else {
        toast({ title: "Error occurred while uploading docs" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error occurred" });
    } finally {
      setLoading(false);
      setFiles(null);
    }
  };

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
            onChange={(e) => setFiles(e.target.files)}
            multiple={appType === "2"}
          />
          <Input
            className="w-1/3"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Give a name for the conversation"
          />
          <Button disabled={loading || !name} onClick={handleSubmit}>
            {!loading ? "Upload" : <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>

      <div className="h-[calc((100vh-4rem)/2)] bg-primary-foreground border-t p-8">
        <h1>{title}</h1>
        {pathname &&
          (broadDesc as BroadDesc)[pathname]?.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === 0 && (
                <p className="text-lg font-semibold my-4">{item.content}</p>
              )}
              {item.type === 1 && <p className="">- {item.content}</p>}
            </React.Fragment>
          ))}
      </div>
    </ScrollArea>
  );
};

export default DocUpload;
