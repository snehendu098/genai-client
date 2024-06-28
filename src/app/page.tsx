import GenAiAppCard from "@/components/core/home/genai-app-cards";
import { cards } from "@/constants/home";
import clsx from "clsx";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col flex-1">
      <nav className="min-w-full border-b-muted-foreground/5 border-b p-4 px-10">
        <h1>Example</h1>
      </nav>
      <div className="w-full flex py-10 items-center justify-center space-x-4 px-[20%]">
        <div className={clsx("grid md:grid-cols-2 lg:grid-cols-3 gap-4")}>
          {" "}
          {cards.map((value, idx) => (
            <React.Fragment key={idx}>
              <GenAiAppCard
                title={value.name}
                description={value.description}
                link={value.link}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}
