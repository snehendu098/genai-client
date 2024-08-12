"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ai-toolbox/core/home/navbar";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { baseUrl } from "@/constants";
import { Button } from "@/components/ui/button";
import { Loader2, SearchCheckIcon } from "lucide-react";
import Markdown from "markdown-to-jsx";

function BackgroundBeamsDemo() {
  const [txtInput, setTxtInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleResponse() {
    try {
      setLoading(true);
      setResponse("");
      const formData = new FormData();
      formData.append("query", txtInput);

      const { data } = await axios.post(`${baseUrl}/app1/esgAgent/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { response } = data;
      if (!response) {
        setLoading(false);
        return toast({
          title: "Error Occured while getting AI response",
          variant: "destructive",
        });
      }

      setResponse(response);
    } catch (err) {
      console.log(err);
      toast({ title: "Error Occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen max-w-screen rounded-md bg-neutral-950 relative flex flex-col items-center antialiased">
      <BackgroundBeams className="fixed" />
      <Navbar />
      <div className="p-4 mt-10">
        <p className="text-7xl text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold bg-clip-text">
          ESG Research Agent
        </p>
        <div className="w-[50vw] grid grid-cols-6 gap-4 items-center mt-20">
          <Input
            type="text"
            placeholder="hello"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 col-span-5 relative z-10  bg-neutral-950 placeholder:text-neutral-700"
            value={txtInput}
            onChange={(e) => setTxtInput(e.target.value)}
          />
          <Button
            disabled={loading}
            onClick={handleResponse}
            className="col-span-1 z-10"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <SearchCheckIcon />
            )}
          </Button>
          <div
            className="col-span-5 text-xs text-neutral-500 text-center
        "
          >
            Quikable AI might make errors, confirm with your sustainability team
          </div>
        </div>
        <div className="mt-10 w-[50vw] pb-12">
          {response && (
            <div className="w-full mkd rounded-lg bg-black border p-8 border-primary-foreground prose text-white/60 my-2 text-lg relative z-10">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </div>
        {/* <h1 className="relative z-10 text-lg md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          ESG Research Agent
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          An autonomous ESG agent designed for your ESG research to provide
          rapid insights and comprehensive reports. It takes care of everything
          from accurate source gathering to organizing research results
        </p>
        <div className="w-full grid grid-cols-6 gap-4 items-center mt-20">
          <Input
            type="text"
            placeholder="hello"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 col-span-5 relative z-10  bg-neutral-950 placeholder:text-neutral-700"
            value={txtInput}
            onChange={(e) => setTxtInput(e.target.value)}
          />
          <Button
            disabled={loading}
            onClick={handleResponse}
            className="col-span-1 z-10"
          >
            {loading}
            <SearchCheckIcon />
          </Button>
          <div
            className="col-span-5 text-xs text-neutral-500 text-center
        "
          >
            Quikable AI might make errors, confirm with your sustainability team
          </div>
        </div>
        <div className="mt-10 w-full pb-12">
          {!loading && !response && <></>}
          {response && (
            <div className="w-full mkd rounded-lg bg-black border p-8 border-primary prose prose-lg text-white/60 max-w-lg my-2 text-sm relative z-10">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default BackgroundBeamsDemo;
