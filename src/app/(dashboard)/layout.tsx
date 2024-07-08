import NavBar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative flex-col max-h-screen">
      <NavBar />
      <main className="flex w-full h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
};

export default App;
