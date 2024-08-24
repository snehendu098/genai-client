import NavBar from "@/components/core/navbar";
import { PageAppWrappper } from "@/context/pdf-page-provider";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageAppWrappper>
      <div className="flex relative flex-col max-h-screen">
        <NavBar />
        <main className="flex w-full h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </PageAppWrappper>
  );
};

export default App;
