import NavBar from "@/components/core/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative flex-col max-h-screen">
      <NavBar />
      <main className="flex w-full h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
};

export default Layout;
