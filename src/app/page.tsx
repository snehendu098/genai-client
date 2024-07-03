"use client";

import GenAiAppCard from "@/components/core/home/genai-app-cards";
import { Button } from "@/components/ui/button";
import { cards } from "@/constants/home";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const session: any = useSession();

  console.log(session);

  return (
    <main className="flex min-h-screen flex-col flex-1">
      <nav className="min-w-full border-b-muted-foreground/5 border-b p-4 px-10 flex justify-between">
        <h1>Example</h1>
        {session.status === "authenticated" && (
          <Button onClick={async () => await signOut()}>Log Out</Button>
        )}
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
