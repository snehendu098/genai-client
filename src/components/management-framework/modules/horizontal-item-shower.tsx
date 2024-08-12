import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";

const HorizontalShow = ({
  data,
  icon,
  headerTxt,
  btnTxt,
  redirectUrl,
}: {
  data: any[];
  icon: React.ReactElement;
  headerTxt?: string;
  btnTxt?: string;
  redirectUrl?: string;
}) => {
  return (
    <div className="w-full p-8 h-[35%]">
      <div className="w-full flex justify-between">
        <p className="text-4xl font-semibold">{headerTxt || "Templates"}</p>
        <Button asChild>
          {/* TODO: Link fix */}
          <Link href={redirectUrl || "/"}>{btnTxt || "View All"}</Link>
        </Button>
      </div>
      <ScrollArea className="w-full mb-4 overflow-x-auto">
        <div className="flex py-8 whitespace-nowrap space-x-10">
          {data.map((item, index) => (
            <Link key={index} href={"/"}>
              <div className="border rounded-md w-40 flex flex-col items-center overflow-hidden">
                {icon}
                <Separator />
                <div className="w-full bg-primary-foreground">
                  <p className="truncate px-2 text-sm text-center font-semibold">
                    {item.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default HorizontalShow;
