import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-[calc(100vh-4rem)]">{children}</div>;
};

export default Layout;
