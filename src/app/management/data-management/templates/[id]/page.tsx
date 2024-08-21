"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useTemplateContext } from "@/context/template-provider";
import clsx from "clsx";
import { ChevronDown, Plus } from "lucide-react";
import React, { useContext, useState } from "react";

const menu = ["Environment", "Social", "Governance"];

const Page = ({ params }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState<string>("Environment");
  const { setTemplateOptions, templateOptions } = useTemplateContext();
  const [category, setCategory] = useState<string>("");

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-full relative">
      <div className="p-8">
        {/* Dropdown to show everything */}

        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 bg-blue-800 rounded-md">
            <div className="flex items-center font-bold">
              <ChevronDown />
              <p className="ml-2">{activeTab}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {menu.map((item, index) => (
              <DropdownMenuItem onClick={() => setActiveTab(item)} key={index}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Category button and questions */}
        <div className="flex items-center mt-6 ">
          <Input className="max-w-[20vw] mr-4" placeholder="Subcategory 1" />
          <Button className="flex items-center">Create</Button>
        </div>
        <div className="mt-6 w-full grid grid-cols-2 gap-4">
          {/* TODO: Ui to do the subcategory part */}
          <Textarea className="h-[60vh]" />
          <div className="w-full h-auto">
            <h1>Preview Window</h1>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Page;
