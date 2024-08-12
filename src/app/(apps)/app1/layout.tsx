import Sidebar from "@/components/ai-toolbox/dashboard/sidebar";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full grid grid-cols-6">
      <Sidebar appType={1} btnText="Create Summary" btnLink={"/app1"} />
      {children}
    </div>
  );
};

export default App;
