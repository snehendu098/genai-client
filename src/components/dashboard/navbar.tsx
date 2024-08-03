"use client";

import React, { useMemo } from "react";
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

  const options = useMemo(
    () => ({
      "/app1": "ESG Document Summarizer",
      "/app2": "ESG Questionnaire",
      "/app3": "ESG Governance",
    }),
    []
  );

  const currentOption = useMemo(() => {
    if (urlPath.includes("/app1")) {
      return "/app1";
    } else if (urlPath.includes("/app2")) {
      return "/app2";
    } else {
      return "/app3";
    }
  }, [urlPath]);

  return (
    <nav className="top-0 border border-b sticky grid grid-cols-6 right-0 left-0 items-center w-full h-16 backdrop-blur px-10">
      <Link href={"/"}>
        <p className="text-xl font-bold">
          <span className="text-primary text-3xl ">Q</span>uikable
        </p>
      </Link>
      <div className="col-span-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center font-bold">
              <ChevronDown />
              <p className="ml-2">{options[currentOption]}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>ESG Ai Toolbox</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {cards.map((item, idx) => (
              <DropdownMenuItem asChild key={idx}>
                <Link href={item.link}>{item.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavBar;
