"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Supplier,
  suppliersDummy,
} from "@/constants/management-framework/dummy";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const App = () => {
  const [supplierInput, setSupplierInput] = useState("");
  const [groupName, setGroupName] = useState("");

  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const router = useRouter();

  function checkIfIdExists(id: number): boolean {
    return suppliers.some((user) => user._id === id);
  }

  const removeSupplierAtIndex = (index: number) => {
    setSuppliers((prevSuppliers) => {
      // Create a new array without the item at the given index
      const newSuppliers = [...prevSuppliers];
      newSuppliers.splice(index, 1); // Remove one element at the specified index
      return newSuppliers;
    });
  };

  const getSuppliers = async () => {
    try {
      const { data } = await axios.get("/api/management/suppliers/");

      if (!data.success) {
        return toast({ title: "Error occurred", variant: "destructive" });
      }

      if (data.success && data.supplier.length === 0) {
        toast({
          title: "No Suppliers found",
          description: "Create suppliers to get started",
        });
        router.push("/management/data-management/suppliers/create/");
      }

      setAllSuppliers(data.supplier);
    } catch (err) {
      console.log("err", err);
      toast({
        title: "Error while creating supplier group",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getSuppliers();
    console.log("sp", suppliers);
  }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    try {
      if (!groupName || suppliers.length === 0) {
        console.log(groupName, suppliers);
        return toast({ title: "Fill out the fields", variant: "destructive" });
      }

      const { data } = await axios.post("/api/management/suppliers/group/", {
        name: groupName,
        supplierIds: suppliers.map((item) => item._id),
      });

      if (!data.success) {
        return toast({
          title: "Error Occurred",
          description: data.message || "",
          variant: "destructive",
        });
      }

      return toast({
        title: "Group Created Succesfully",
        description: data.message || "",
      });
    } catch (err) {
      console.log("err", err);
      toast({
        title: "Error while creating supplier group",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center relative justify-center">
      <Card className="mx-auto w-[50%] transition duration-700 max-w-xl bg-muted relative">
        <CardHeader>
          <CardTitle>Create a Single Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: Value updation */}
          <form onSubmit={handleCreate}>
            <Label>Group Name</Label>
            <Input
              id="identifier"
              className="mb-6 mt-2"
              placeholder="Demo Group 1"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="mb-6 relative transition duration-500">
              <Label>Username or Identifier</Label>
              <Input
                id="usernmae"
                placeholder="john123"
                value={supplierInput}
                onChange={(e) => setSupplierInput(e.target.value)}
              />

              {supplierInput && (
                <ScrollArea className="bg-background mt-2 max-h-72 overflow-hidden rounded-md text-sm flex flex-col">
                  {allSuppliers.length > 0 &&
                    allSuppliers
                      .filter((item) => {
                        return (
                          (item.username
                            .toLowerCase()
                            .includes(supplierInput.toLowerCase()) ||
                            item.identifier
                              .toLowerCase()
                              .includes(supplierInput.toLowerCase())) &&
                          !checkIfIdExists(item._id)
                        );
                      })
                      .map((item: Supplier, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSuppliers([...suppliers, item]);
                            setSupplierInput("");
                          }}
                          className={clsx(
                            "w-full transition duration-500 text-neutral-400 cursor-pointer hover:bg-primary-foreground flex px-4 p-2"
                          )}
                        >
                          {item.username} ({item.identifier})
                        </div>
                      ))}
                </ScrollArea>
              )}
              <ScrollArea className="py-4 whitespace-nowrap w-full">
                <div className="flex w-max">
                  {suppliers.map((item: any, index: number) => (
                    <div
                      className="px-2 mr-2 flex items-center space-x-2 border-2 border-primary rounded-full"
                      key={index}
                    >
                      <p>{item.username}</p>

                      <div
                        onClick={() => removeSupplierAtIndex(index)}
                        className="cursor-pointer hover:text-primary"
                      >
                        <IoMdClose />
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="w-full grid grid-cols-2 gap-6">
              <Button type="submit" className="w-full">
                Create Group
              </Button>
              <Button asChild variant={"outline"}>
                <Link href={"/management/data-management/suppliers/create"}>
                  Create Supplier
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
