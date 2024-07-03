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

const page = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email to get a code and set your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Label className="col-span-3">Enter Email</Label>
            <div className="space-y-2 col-span-2">
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
            <Button>Send Code</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">OTP</Label>
            <Input id="password" type="password" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="password" type="password" required />
          </div>
          <p className="text-muted-foreground text-xs">
            Already have an account?{" "}
            <span className="text-white">
              <Link href={"/sign-in"}>Log In</Link>
            </span>
          </p>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </CardContent>
    </>
  );
};

export default page;
