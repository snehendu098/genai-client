"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/core/home/navbar";

function BackgroundBeamsDemo() {
  return (
    <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased">
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
        <Input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />

        <div className="mt-10 pb-12">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia. Lorem ipsum
          dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore
          culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.
          Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud
          ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est
          proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea
          nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis
          laboris cupidatat officia voluptate. Culpa proident adipisicing id
          nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
          reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate
          laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa
          duis.Lorem ipsum dolor sit amet, officia excepteur ex fugiat
          reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex
          esse exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis. Reprehenderit nostrud nostrud
          ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est
          proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea
          nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis
          laboris cupidatat officia voluptate. Culpa proident adipisicing id
          nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
          reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate
          laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa
          duis. Lorem ipsum dolor sit amet, officia excepteur ex fugiat
          reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex
          esse exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis. Lorem ipsum dolor sit amet,
          officia excepteur ex fugiat reprehenderit enim labore culpa sint ad
          nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim
          cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
          est aliquip amet voluptate voluptate dolor minim nulla est proident.
          Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt
          ex occaecat reprehenderit commodo officia dolor Lorem duis laboris
          cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi
          laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit
          commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint
          cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        </div>
      </div>
      <BackgroundBeams className="fixed" />
    </div>
  );
}

export default BackgroundBeamsDemo;
