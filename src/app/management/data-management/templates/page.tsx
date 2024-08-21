"use client";

import React, { useState } from "react";
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

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface Option {
  title: string;
  description: string;
  loading: boolean;
}

const Page = () => {
  const [options, setOptions] = useState<Option>({
    title: "",
    description: "",
    loading: false,
  });

  const router = useRouter();

  const handleAlertContinue = async () => {
    setOptions({ ...options, loading: true });
    if (!options.title) {
      return toast({
        title: "No title found",
        description: "Enter a title to continue",
        variant: "destructive",
      });
    }

    // TODO: handle clicked in axios
    const id = "62f2613987d6f8199b56c123";
    router.push(`/management/data-management/templates/${id}`);
    setOptions({ ...options, loading: false });
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] overflow-hidden flex-1">
      <HorizontalShow
        data={templateDummy}
        icon={<FcDocument className="h-32 w-32" />}
        headerTxt="Drafts"
        baseUrl=""
      />
      {/* Your Templates heading */}
      <div className="flex px-8 items-center justify-between">
        <h1>All Templates</h1>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-700 mr-2">
                Create
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create a Template</AlertDialogTitle>
                <AlertDialogDescription>
                  To create a template, you need to create a template name and
                  description
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="w-full">
                <div className="grid grid-cols-3 gap-4">
                  <Label>
                    Title <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    placeholder="Example template 1"
                    className="col-span-3"
                    value={options.title}
                    onChange={(e) =>
                      setOptions({ ...options, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid mt-6 grid-cols-3 gap-4">
                  <Label>Description</Label>
                  <Input
                    placeholder="Short Description"
                    className="col-span-3"
                    value={options.description}
                    onChange={(e) =>
                      setOptions({ ...options, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  disabled={options.loading}
                  onClick={handleAlertContinue}
                >
                  Continue
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant={"destructive"} disabled={true}>
            Delete
          </Button>
        </div>
      </div>

      {/* Table */}
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
