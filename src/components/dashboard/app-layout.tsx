import React from "react";
import { ScrollArea } from "../ui/scroll-area";

const AppLayouts = ({
  pdfLink,
  children,
}: {
  pdfLink: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full w-full col-span-5">
      <div className="w-full h-[calc(100vh-4rem)] flex">
        <iframe
          src={`https://docs.google.com/gview?url=${pdfLink}&embedded=true`}
          className="w-1/2 h-full"
        ></iframe>

        <ScrollArea className="w-1/2 h-full flex flex-col p-10">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
};

export default AppLayouts;
