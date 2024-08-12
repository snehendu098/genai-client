"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const session: any = useSession();
  const router = useRouter();

  return (
    <nav className="min-w-full border-b h-16  px-10 flex justify-between items-center backdrop-blur-sm z-20">
      <div>
        <Link href={"/"}>
          <p className="text-xl font-bold">
            <span className="text-primary text-3xl ">Q</span>uikable
          </p>
        </Link>
      </div>
      {session.status === "authenticated" ? (
        <Button onClick={async () => await signOut()}>Log Out</Button>
      ) : (
        <Button onClick={() => router.push("/sign-in")}>Log In</Button>
      )}
    </nav>
  );
};

export default Navbar;
