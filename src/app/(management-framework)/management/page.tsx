"use client";

import Navbar from "@/components/management-framework/home/Navbar";
import AppCard from "@/components/management-framework/home/AppCards";

import clsx from "clsx";
import React from "react";
import { cards } from "@/constants/management-framework/home";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col flex-1">
      <Navbar />
      <div className="w-full flex flex-col py-10 justify-center space-x-4 px-[10%]">
        <h1 className="my-[8%] text-7xl px-2">ESG AI Toolbox</h1>
        <div className={clsx("grid md:grid-cols-3 gap-4")}>
          {cards.map((value, idx) => (
            <React.Fragment key={idx}>
              <AppCard
                title={value.name}
                description={value.description}
                link={value.link}
                desc2={value.desc2 || ""}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}
