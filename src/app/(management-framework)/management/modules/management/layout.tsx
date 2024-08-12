import Sidebar from "@/components/management-framework/modules/sidebar";
import { managementMenu } from "@/constants/management-framework/management";
import React from "react";

const ManagementLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full grid grid-cols-6">
      <Sidebar appType={"management"} menu={managementMenu} />
      <div className="col-span-5">{children}</div>
    </div>
  );
};

export default ManagementLayout;
