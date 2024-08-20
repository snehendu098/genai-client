import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { templateDummy } from "@/constants/management-framework/dummy";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import HorizontalShow from "@/components/management-framework/modules/horizontal-item-shower";
import { FcDocument } from "react-icons/fc";

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] overflow-hidden flex-1">
      <HorizontalShow
        data={templateDummy}
        icon={<FcDocument className="h-32 w-32" />}
        headerTxt="Drafts"
      />
      <div className="flex px-8 items-center justify-between">
        <h1>All Templates</h1>
        <div>
          <Button asChild className="bg-blue-500 hover:bg-blue-700 mr-2">
            <Link href={"/management/data-management/templates/create"}>
              Create
            </Link>
          </Button>
          <Button variant={"destructive"} disabled={true}>
            Delete
          </Button>
        </div>
      </div>
      <ScrollArea className="w-full px-8 h-[56%] mt-6">
        <div className="flex flex-col pr-6">
          <Table className="w-full mt-5">
            <TableCaption>A list of all the recent templates</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox disabled />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Responses</TableHead>
                <TableHead className="text-center">Show</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templateDummy.map((tmplt) => (
                <TableRow key={tmplt._id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{tmplt.name}</TableCell>
                  <TableCell className="text-center">
                    {tmplt.responseIds.length}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={"/"}>
                      <p className="text-blue-300">Show Responses</p>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date() > new Date(tmplt.endDate) ? (
                      <div className="text-blue-400">Active</div>
                    ) : (
                      <div className="text-red-400">Ended</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
