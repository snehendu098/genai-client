"use client";

import GenAiAppCard from "@/components/core/home/genai-app-cards";
import { Button } from "@/components/ui/button";
import { cards } from "@/constants/home";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const session: any = useSession();
  const router = useRouter();

  console.log(session);

  return (
    <main className="flex min-h-screen flex-col flex-1">
      <nav className="min-w-full border-b-muted-foreground/5 border-b h-16  px-10 flex justify-between items-center ">
        <div>
          <h1>Wisdom AI</h1>
        </div>
        {session.status === "authenticated" ? (
          <Button onClick={async () => await signOut()}>Log Out</Button>
        ) : (
          <Button onClick={() => router.push("/sign-in")}>Log In</Button>
        )}
      </nav>
      <div className="w-full flex flex-col py-10 justify-center space-x-4 px-[10%]">
        <h1 className="my-[8%] text-7xl px-2">ESG AI Toolbox</h1>
        <div className={clsx("grid md:grid-cols-3 gap-4")}>
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
