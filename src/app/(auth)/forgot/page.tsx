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
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const [data, setdata] = useState({
    email: "",
    password: "",
    confirm: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (data.password !== data.confirm) {
        return toast({ title: "Paswords don't match", variant: "destructive" });
      }

      const res = await axios.post("/api/forgot-password", data);

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
          title: "Password Reset successful",
          description: response.message,
        });
      }
    } catch (err: any) {
      console.log("err", err);
      setLoading(false);
      return toast({
        title: "Error Occurred",
        description: err.response.data.message || "",
      });
    } finally {
      setLoading(false);
    }

    router.push("/sign-in");
  };

  async function sendCode() {
    setOtpLoading(true);

    try {
      const res = await axios.post("/api/forgot-password/request", data);

      if (res.data.success) {
        return toast({ title: res.data.message });
      }
    } catch (err) {
      console.log(err);
      toast({ title: "Error Occurred" });
    } finally {
      setOtpLoading(false);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email to get a code and set your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Label className="col-span-3">Enter Email</Label>
            <div className="space-y-2 col-span-2">
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={data.email}
                onChange={(e) => setdata({ ...data, email: e.target.value })}
              />
            </div>
            <Button disabled={otpLoading} type="button" onClick={sendCode}>
              {!otpLoading ? (
                "Send Code"
              ) : (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={data.password}
              onChange={(e) => setdata({ ...data, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={data.confirm}
              onChange={(e) => setdata({ ...data, confirm: e.target.value })}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Already have an account?{" "}
            <span className="text-white">
              <Link href={"/sign-in"}>Log In</Link>
            </span>
          </p>
          <Button disabled={loading} type="submit" className="w-full">
            {!loading ? (
              "Sign Up"
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>{" "}
        </form>
      </CardContent>
    </>
  );
};

export default Page;
