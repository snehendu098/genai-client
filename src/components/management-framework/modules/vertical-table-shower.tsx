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
import { MdDelete, MdModeEdit } from "react-icons/md";

const VertialShow = ({
  data,
  heading,
  btnText,
  redirectUrl,
  baseUrl,
}: {
  data: any[];
  heading?: string;
  btnText?: string;
  redirectUrl?: string;
  baseUrl?: string;
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

                <TableHead className="text-right">Options</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow className="border-b border-background" key={item._id}>
                  <TableCell className="font-medium">{item.username}</TableCell>
                  <TableCell>{item.identifier}</TableCell>

                  <TableCell className="flex flex-row-reverse items-center ">
                    <div className="text-lg border-2 border-red-400 text-red-400 p-2 rounded-lg hover:bg-red-200/15 transition duration-500 cursor-pointer">
                      <MdDelete />
                    </div>

                    <div className="text-lg border-2 border-blue-400 text-blue-400 p-2 mx-2 rounded-lg hover:bg-blue-200/15 transition duration-500 cursor-pointer">
                      <MdModeEdit />
                    </div>
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
