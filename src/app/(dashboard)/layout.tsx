import Sidebar from "@/components/dashboard/sidebar";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen">
      <div className="flex-[1] max-w-xs">
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="max-h-screen flex-1">{children}</div>
    </div>
  );
};

export default App;
