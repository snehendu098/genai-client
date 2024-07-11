"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../../src/components/ui/input";
import mongoose from "mongoose";

const DocsViewer = ({ type }: { type: number }) => {
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState<File | null>();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function getDocs() {
    try {
      const res = await axios.get("/api/docs");
      if (res.data.success) {
        setDocs(res.data.docs);
      }
    } catch (err) {
      console.log(err);
      toast({ title: "Error occurred" });
    }
  }

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

      // console.log(uploadedRes);

      if (uploadedRes.statusText === "OK") {
        const uploaded_data = uploadedRes.data;

        if (!uploaded_data.pdf_id || !uploaded_data.file_url) {
          return toast({ title: "Error Occurred", variant: "destructive" });
        }

        const res = await axios.post("/api/docs/", {
          id: uploaded_data?.pdf_id,
          name: file.name,
          url: uploaded_data?.file_url,
        });

        if (res.data.success) {
          return toast({ title: "Document has successfully been saved" });
        } else {
          // console.log(res);
          return toast({ title: "Error Occurred while uplloading docs" });
        }
      }
    } catch (err) {
      console.log(err);
      return toast({ title: "Error Occurred" });
    } finally {
      setLoading(false);
      setName("");
      setFile(null);
    }
  }

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between">
        <h1>Your Docs</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Add Docs"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add A Document</AlertDialogTitle>
              <AlertDialogDescription>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col space-y-2">
              <p className="alert-label">Choose File</p>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setFile(file);
                }}
              />
              <Input
                placeholder="File Name"
                value={(file && file.name) || name}
                onChange={(e) => setName((file && file.name) || e.target.value)}
                disabled
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col space-y-2 mt-6">
        {docs.length > 0 &&
          docs.map(
            (
              value: { name: string; _id: string; url: string },
              idx: number
            ) => (
              <React.Fragment key={idx}>
                <Link href={`/app${type}/${value._id}`}>
                  <div className="flex p-4 hover:bg-primary-foreground/15 transition duration-500 rounded-md bg-primary-foreground/80 ">
                    <FileText />
                    <p className="ml-4">{value.name}</p>
                  </div>
                </Link>
              </React.Fragment>
            )
          )}
      </div>
    </div>
  );
};

export default DocsViewer;
