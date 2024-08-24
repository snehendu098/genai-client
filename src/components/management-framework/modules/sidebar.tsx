"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "@/constants/management-framework/management";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Sidebar = ({ baseUrl, menu }: { baseUrl: string; menu: Menu[] }) => {
  const pathName = usePathname();

  return (
    <ScrollArea
      className={clsx(
        "col-span-1 space-y-6 min-h-full border-r px-4",
        pathName.match(/\/templates\/[a-f\d]{24}$/) && "hidden"
      )}
    >
      {/* The item url itself starts with "/" */}
      {menu.map((item: any, idx: number) => (
        <Link key={idx} href={`${baseUrl}${item.url}`}>
          <div className="px-4 py-2 hover:bg-primary mb-2 rounded-md cursor-pointer transition duration-500">
            {item?.name}
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
};

export default Sidebar;
