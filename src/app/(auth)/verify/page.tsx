import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const page = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Verify</CardTitle>
        <CardDescription>Enter your email to start using</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">OTP</Label>
            <Input id="password" type="password" required />
          </div>

          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </CardContent>
    </>
  );
};

export default page;
