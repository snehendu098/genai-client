import NavBar from "@/components/ai-toolbox/dashboard/navbar";
import { AppWrapper } from "@/context/app-provider";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppWrapper>
      <div className="flex relative flex-col max-h-screen">
        <NavBar />
        <main className="flex w-full h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </AppWrapper>
  );
};

export default App;
