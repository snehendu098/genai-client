"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { dropdownOptions } from "@/constants";

const NavBar = () => {
  const urlPath = usePathname();
  const session: any = useSession();
  const router = useRouter();
  const [name, setName] = useState<string>("");

  const currentOption = useCallback(() => {
    for (let i = 0; i < dropdownOptions.length; i++) {
      const item = dropdownOptions[i];
      if (item.head !== true && urlPath.includes(item.url)) {
        setName(item.name);
        return;
      }
      if (item.head && urlPath.toString() === item.url) {
        setName(item.name);
        return;
      }
    }
  }, [urlPath]);

  useEffect(() => {
    currentOption();
  }, [urlPath]);

  return (
    <nav className="top-0 border border-b sticky grid grid-cols-6 right-0 left-0 items-center w-full h-16 backdrop-blur px-10">
      <Link href={"/"}>
        <p className="text-xl font-bold">
          <span className="text-primary text-3xl ">Q</span>uikable
        </p>
      </Link>
      {/* dropdown */}
      <div className="col-span-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center font-bold">
              <ChevronDown />
              <p className="ml-2">{name}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropdownOptions.map((item, index) =>
              item.head ? (
                <React.Fragment key={index}>
                  {index !== 0 && <DropdownMenuSeparator />}
                  <DropdownMenuLabel asChild key={index}>
                    <Link className="text-lg font-extrabold" href={item.url}>
                      {item.name}
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </React.Fragment>
              ) : (
                <DropdownMenuItem asChild key={index}>
                  <Link href={item.url}>{item.name}</Link>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="col-span-1 flex flex-row-reverse">
        {session.status === "authenticated" ? (
          <Button onClick={async () => await signOut()}>Log Out</Button>
        ) : (
          <Button onClick={() => router.push("/sign-in")}>Log In</Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
