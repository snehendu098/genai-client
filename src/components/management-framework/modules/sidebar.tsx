import React from "react";

import Link from "next/link";
import { Menu } from "@/constants/management-framework/management";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = ({ baseUrl, menu }: { baseUrl: string; menu: Menu[] }) => {
  return (
    <ScrollArea className="col-span-1 space-y-6 min-h-full border-r px-4">
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
