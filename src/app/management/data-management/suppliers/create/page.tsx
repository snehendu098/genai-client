"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [supplierData, setSupplierData] = useState<any>({
    username: "",
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSaveSupplier = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        !supplierData.username ||
        !supplierData.identifier ||
        !supplierData.password
      ) {
        setLoading(false);
        return toast({
          title: "Fill up all the fields",
          variant: "destructive",
        });
      }

      const { data } = await axios.post(
        "/api/management/suppliers/",
        supplierData
      );

      console.log(data);

      if (!data.success) {
        setLoading(false);
        return toast({
          title: data.message,
          variant: "destructive",
        });
      }

      toast({ title: data.message });
      router.push("/management/data-management/suppliers");
    } catch (err: any) {
      console.log("supplier save error", err);
      toast({
        title: "Error Occurred",
        description: err.response.data.message || "",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="mx-auto w-[50%] max-w-xl bg-muted">
        <CardHeader>
          <CardTitle>Create a Single Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSupplier}>
            <Label>Username</Label>
            {/* TODO: Value updation */}
            <Input
              className="mb-6 mt-2"
              id="usernmae"
              placeholder="john123"
              value={supplierData.username}
              onChange={(e) =>
                setSupplierData({ ...supplierData, username: e.target.value })
              }
            />
            <Label>Identifier</Label>
            <Input
              id="identifier"
              className="mb-6 mt-2"
              placeholder="john 1"
              value={supplierData.identifier}
              onChange={(e) =>
                setSupplierData({ ...supplierData, identifier: e.target.value })
              }
            />
            <Label>Password</Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={supplierData.password}
              onChange={(e) =>
                setSupplierData({ ...supplierData, password: e.target.value })
              }
              className="mb-6 mt-2"
            />
            <div className="w-full grid grid-cols-2 gap-6">
              <Button
                type="submit"
                onClick={handleSaveSupplier}
                className="w-full"
                disabled={loading}
              >
                Create Supplier
              </Button>
              <Button asChild variant={"outline"}>
                <Link
                  href={"/management/data-management/suppliers/create/group"}
                >
                  Create Group
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
