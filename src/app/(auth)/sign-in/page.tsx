import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

function App() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Sign in to get started with using our platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
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
