"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function App() {
  const router = useRouter();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(result);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        return toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        return toast({
          title: "Login Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.replace("/");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Sign in to get started with using our platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={data.email}
                onChange={(e) => setdata({ ...data, email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={data.password}
              onChange={(e) => setdata({ ...data, password: e.target.value })}
            />
            <div className="flex flex-row-reverse">
              <p className="text-sm text-white">
                <Link href={"/forgot"}>Forgot Password</Link>
              </p>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span className="text-white">
              <Link href={"/sign-up"}>Sign Up</Link>
            </span>
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
    </>
  );
}

export default App;
