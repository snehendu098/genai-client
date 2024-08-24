import Sidebar from "@/components/management-framework/modules/sidebar";
import { analyticsMenu } from "@/constants/management-framework/management";
import React from "react";

const AnalyticsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full grid grid-cols-6">
      <Sidebar baseUrl={"Data Management"} menu={analyticsMenu} />
      {children}
    </div>
  );
};

export default AnalyticsLayout;
