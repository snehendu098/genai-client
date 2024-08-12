"use client";

import React from "react";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const VertialShow = ({
  data,
  heading,
  btnText,
  redirectUrl,
}: {
  data: any[];
  heading?: string;
  btnText?: string;
  redirectUrl?: string;
}) => {
  return (
    <>
      <div className="w-full flex px-8 py-6 max-h-[22%] justify-between">
        <p className="text-4xl font-semibold">{heading || "Suppliers"}</p>
        <Button asChild>
          {/* TODO: Link fix */}
          <Link href={redirectUrl || "/"}>{btnText || "View All"}</Link>
        </Button>
      </div>
      <ScrollArea className="w-full h-[78%] mt-6 pr-6">
        <div className="flex flex-col space-y-6 px-8">
          <Table className="bg-muted rounded-lg overflow-hidden ">
            <TableCaption>A list of recent suppliers</TableCaption>
            <TableHeader className="bg-primary/15">
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Identifier</TableHead>

                <TableHead className="text-right">Responses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.username}</TableCell>
                  <TableCell>{item.identifier}</TableCell>

                  <TableCell className="text-right">
                    {item.responseIds ? item.responseIds.length : 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </>
  );
};

export default VertialShow;
