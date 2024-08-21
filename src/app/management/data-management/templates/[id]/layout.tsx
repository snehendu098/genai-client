import { TemplateWrappper } from "@/context/template-provider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TemplateWrappper>
      <div className="w-full h-[calc(100vh-4rem)]">{children}</div>
    </TemplateWrappper>
  );
};

export default Layout;
