import Sidebar from "@/components/dashboard/sidebar";
import { dummyPDFLink } from "@/constants/dashboard";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen">
      <div className="flex-[1] max-w-xs">
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="max-h-screen flex-1">
        <div className="w-full h-screen flex">
          <iframe
            src={`https://docs.google.com/gview?url=${dummyPDFLink}&embedded=true`}
            className="w-1/2 h-full"
          ></iframe>

          <div className="w-1/2 h-full flex flex-col overflow-y-auto p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
