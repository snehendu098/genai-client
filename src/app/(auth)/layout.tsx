"use client";

import AuthLayout from "@/components/core/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <AuthLayout>
      <Card className="mx-auto w-full max-w-xl">{children}</Card>
      {pathname !== "/verify" && (
        <Button className="fixed right-10 top-10" asChild variant="secondary">
          <Link href={"/verify"}>Verify</Link>
        </Button>
      )}
      {pathname === "/verify" && (
        <Button asChild className="fixed right-10 top-10" variant="secondary">
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
      )}
    </AuthLayout>
  );
};

export default App;
