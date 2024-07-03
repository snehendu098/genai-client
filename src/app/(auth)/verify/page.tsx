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
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();

  const [data, setdata] = useState({
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/verify", data);

      const response = res.data;
      console.log(response);

      if (!response.success) {
        return toast({
          title: "Error Signing Up",
          description: response.message,
          variant: "destructive",
        });
      }

      if (response.success) {
        toast({
          title: "Signed Up for new account",
          description: response.message,
        });
      }
    } catch (err: any) {
      console.log("err", err);
      return toast({
        title: "Error Occurred",
        description: err.response.data.message || "",
      });
    } finally {
      setLoading(false);
    }

    router.push("/sign-in");
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Verify</CardTitle>
        <CardDescription>Enter your email to start using</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Email</Label>
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
            <Label htmlFor="password">OTP</Label>
            <Input
              id="password"
              type="password"
              required
              value={data.otp}
              onChange={(e) => setdata({ ...data, otp: e.target.value })}
            />
          </div>

          <Button disabled={loading} type="submit" className="w-full">
            {!loading ? (
              "Sign Up"
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </form>
      </CardContent>
    </>
  );
};

export default Page;
