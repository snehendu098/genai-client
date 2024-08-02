"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/core/home/navbar";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { baseUrl } from "@/constants";
import { Button } from "@/components/ui/button";
import { SearchCheckIcon } from "lucide-react";
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
    <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased">
      <BackgroundBeams className="fixed" />
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 mt-10">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Ask Anything to AI
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <div className="w-full grid grid-cols-6 gap-4 items-center mt-8">
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
            <SearchCheckIcon />
          </Button>
        </div>

        <div className="mt-10 pb-12">
          {!loading && !response && <></>}
          {loading && !response && (
            <p className="text-2xl font-semibold">Loading Your reponse...</p>
          )}
          {response && (
            <div className="w-full mkd rounded-lg px-2 prose prose-lg text-neutral-500 max-w-lg my-2 text-sm relative z-10">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BackgroundBeamsDemo;
