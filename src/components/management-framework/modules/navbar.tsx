"use client";

import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cards } from "@/constants/home";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
  const urlPath = usePathname();

  const options = useMemo(
    () => ({
      "/management": "Data Management",
      "/analytics": "Data Analytics",
      "/ai": "AI Module",
    }),
    []
  );

  const currentOption = useMemo(() => {
    if (urlPath.includes("/management")) {
      return "/management";
    } else if (urlPath.includes("/analytics")) {
      return "/analytics";
    } else {
      return "/ai";
    }
  }, [urlPath]);

  return (
    <nav className="top-0 border border-b sticky grid grid-cols-6 right-0 left-0 items-center w-full h-16 backdrop-blur px-10">
      <Link href={"/"}>
        <h1 className="col-span-2 flex items-center">
          Wisdom <span className="text-primary">AI</span>
        </h1>
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
            <DropdownMenuLabel>Wisdom Ai</DropdownMenuLabel>
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
