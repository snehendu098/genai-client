"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "../../ui/scroll-area";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import axios from "axios";
import { toast } from "../../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { SingleDoc } from "@/models/ai-toolbox/Doc.model";
import { baseUrl } from "@/constants";
import { Loader2, PlusCircleIcon, PlusIcon } from "lucide-react";
import { broadDesc } from "@/constants/dashboard";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploader, setUploader] = useState<boolean>(false);
  const [fetchedFiles, setFetchedFiles] = useState<string[]>([]);

  const { data: session } = useSession();

  const handleFileUpload = async () => {
    setLoading(true);
    try {
      if (!files) {
        toast({ title: "Please select a file" });
        setLoading(false);
        return;
      }

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("pdf_file", file);
        formData.append("pdf_id", v4());
        formData.append("user_id", session?.user._id || "");

        const uploadedRes = await axios.post(
          `${baseUrl}/app1/upload_pdf/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (uploadedRes.status === 200) {
          const { pdf_id, file_url } = uploadedRes.data;

          if (!pdf_id || !file_url) {
            toast({ title: "Error occurred", variant: "destructive" });
          }
        }
      }

      toast({ title: "File uploaded successfully" });
      setFiles(null);
      setUploader(false);
    } catch (err) {
      console.log("err", err);
      toast({
        title: "Error",
        description: "Error While uploading file",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!selectedFiles) {
      toast({ title: "Please select a file" });
      setLoading(false);
      return;
    }

    try {
      const arr: SingleDoc[] = [];

      for (const file of selectedFiles) {
        arr.push({
          name: file && file.substring(file.indexOf("_") + 1),
          url: `${baseUrl}/public/${file}`,
          id: file,
        });
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
            `/api/ai/app${appType}/${res.data.id}`
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
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error occurred",
        description: err?.response?.data?.message,
      });
    } finally {
      setLoading(false);
      setFiles(null);
      setName("");
    }
  };

  const getFilesForUser = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("user_id", session?.user._id || "");

      // console.log(session);

      const { data } = await axios.post(
        `${baseUrl}/app1/uploadHistory/`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(data);

      if (JSON.parse(data)) {
        setFetchedFiles(Object.keys(JSON.parse(data)));
      }
    } catch (err: any) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user._id && !uploader) {
      getFilesForUser();
    }
  }, [session, uploader]);

  return (
    <ScrollArea className="col-span-5 h-[calc(100vh-4rem)]">
      <div className="h-[calc((100vh-4rem)/2)] w-full grid grid-cols-2">
        {/* Grid col 1 */}
        <div className="w-full h-full">
          <div className="border-b w-full p-4 font-semibold text-md">
            {headTxt}
          </div>
          <div className="w-full h-full p-8 space-y-4">
            <p className="text-xl font-bold">Upload a file to get started</p>

            <Input
              className="w-1/2"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Give a name for the conversation"
            />
            <Button disabled={loading || !name} onClick={handleSubmit}>
              {!loading ? "Upload" : <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </div>
        {/* File History */}
        <div className="w-full min-h-full border-l">
          <div className="border-b w-full px-4 p-2 flex justify-between items-center">
            <p className="font-semibold text-md">Files</p>
            <div
              onClick={() => setUploader(!uploader)}
              className="p-2 rounded-md bg-primary-foreground cursor-pointer hover:bg-primary/80"
            >
              <PlusIcon />
            </div>
          </div>
          {/* Uploader and  */}
          <ScrollArea className="h-[calc(100%-4rem)] p-2">
            {!uploader ? (
              <>
                {!loading && fetchedFiles.length === 0 && (
                  <p>Upload A File to get started</p>
                )}
                {fetchedFiles.length > 0 && (
                  <Table>
                    <TableCaption>A list of your recent Files</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Checkbox disabled={!(appType === "2")} />
                        </TableHead>
                        <TableHead>Name</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fetchedFiles.toReversed().map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            {/* CHECKBOX FEATURE */}
                            <Checkbox
                              checked={selectedFiles.includes(item)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  if (appType === "2") {
                                    // Allow multiple selections
                                    setSelectedFiles((prev) => [...prev, item]);
                                  } else {
                                    // Only allow one selection
                                    setSelectedFiles([item]);
                                  }
                                } else {
                                  setSelectedFiles((prev) =>
                                    prev.filter((file) => file !== item)
                                  );
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {item && item.substring(item.indexOf("_") + 1)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </>
            ) : (
              <div className="w-full py-10 flex flex-col items-center justify-center">
                <Card>
                  <CardHeader>
                    <p className="text-lg font-semibold">UPLOAD FILES</p>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="file"
                      className="w-full"
                      accept="application/pdf"
                      onChange={(e) => setFiles(e.target.files)}
                      multiple
                    />
                    <Button
                      disabled={loading}
                      onClick={handleFileUpload}
                      className="mt-6"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Upload"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      <div className="h-[calc((100vh-4rem)/2)] bg-primary-foreground border-t p-8">
        <h1 className="mb-12">{title}</h1>
        {pathname &&
          (broadDesc as BroadDesc)[pathname]?.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === 0 && index === 0 && (
                <p className="text-xl font-semibold my-4">{item.content}</p>
              )}
              {item.type === 0 && index !== 0 && (
                <p className="text-xl font-semibold mt-8">{item.content}</p>
              )}
              {item.type === 1 && <p>- {item.content}</p>}
            </React.Fragment>
          ))}
      </div>
    </ScrollArea>
  );
};

export default DocUpload;
