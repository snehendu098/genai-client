"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "../../ui/scroll-area";
import axios from "axios";
import { toast } from "../../ui/use-toast";
import { Button } from "../../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IChat } from "@/models/ai-toolbox/Chat.model";
import { Doc } from "@/models/ai-toolbox/Doc.model";

const Sidebar = ({
  appType,
  btnText,
  btnLink,
}: {
  appType: number;
  btnText: string;
  btnLink: string;
}) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const pathName = usePathname();

  async function getDocs() {
    setLoading(true);
    try {
      const res = await axios.get("/api/docs");
      if (res.data.success) {
        setDocs(res.data.docs);
      }
    } catch (err) {
      console.log(err);
      toast({ title: "Error occurred" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDocs();
  }, [appType, pathName]);

  return (
    <ScrollArea className="col-span-1 space-y-6 min-h-full border-r px-4">
      {btnText && (
        <Button
          asChild
          className="w-full flex items-center justify-center mb-6"
        >
          <Link href={btnLink}>{btnText}</Link>
        </Button>
      )}
      {!loading ? (
        docs
          .filter((i: Doc) =>
            appType !== 2
              ? i.responses.some((item: any) => item.type === appType)
              : i.chatInitiate
          )
          .map((item: any, idx: number) => (
            <Link key={idx} href={`/app${appType}/${item._id}`}>
              <div className="px-4 py-2 hover:bg-gray-200/15 mb-2 rounded-md cursor-pointer transition duration-500">
                {item?.name}
              </div>
            </Link>
          ))
      ) : (
        <p>Loading the documents</p>
      )}
    </ScrollArea>
  );
};

export default Sidebar;
