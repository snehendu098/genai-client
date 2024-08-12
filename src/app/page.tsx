"use client";

import GenAiAppCard from "@/components/ai-toolbox/core/home/genai-app-cards";
import Navbar from "@/components/ai-toolbox/core/home/navbar";
import { cards } from "@/constants/home";
import clsx from "clsx";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col flex-1">
      <Navbar />
      <div className="w-full flex flex-col py-10 justify-center space-x-4 px-[10%]">
        <h1 className="my-[8%] text-7xl px-2">ESG AI Toolbox</h1>
        <div className={clsx("grid lg:grid-cols-4 md:grid-cols-2 gap-4")}>
          {cards.map((value, idx) => (
            <React.Fragment key={idx}>
              <GenAiAppCard
                title={value.name}
                description={value.description}
                link={value.link}
                desc2={value.desc2 || null}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}
