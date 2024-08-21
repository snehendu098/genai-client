"use client";

import Sidebar from "@/components/management-framework/modules/sidebar";
import { managementMenu } from "@/constants/management-framework/management";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

const ManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  return (
    <div className="w-full h-full grid grid-cols-6">
      <Sidebar baseUrl={"/management/data-management"} menu={managementMenu} />
      <div
        className={clsx(
          "col-span-5",
          pathName.match(/\/templates\/[a-f\d]{24}$/) && "!col-span-6"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ManagementLayout;
