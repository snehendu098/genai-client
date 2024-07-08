"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cards } from "@/constants/home";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  const urlPath = usePathname();

  const options: any = {
    "/app1": "ESG Document Summarization",
    "/app2": "ESG Question Answer",
    "/app3": "ESG Principles Checklist",
  };

  return (
    <nav className="top-0 border border-b sticky grid grid-cols-6 right-0 left-0 items-center w-full h-16 backdrop-blur px-10">
      <h1 className="col-span-1 flex items-center">ESG Ai Toolbox</h1>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center font-bold">
            <ChevronDown />
            <p className="ml-2">{options[`${urlPath}`]}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>ESG Ai Toolbox</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {cards.map((item, idx: number) => (
            <DropdownMenuItem asChild key={idx}>
              <Link href={item.link}>{item.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default NavBar;
