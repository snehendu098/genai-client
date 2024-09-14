import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="col-span-5">{children}</div>;
}

export default Layout;
