"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "../ui/use-toast";
import axios from "axios";

const ChatShow = ({
  item,
}: {
  item: {
    content: string;
    type: number;
    id?: string;
    helpful?: boolean | null;
  };
}) => {
  const [marked, setMarked] = useState(false);

  const handleClick = async (res_helpful: boolean) => {
    try {
      const { data } = await axios.post("/api/ai/app2/set-helpful", {
        chatId: item.id,
        helpful: res_helpful,
      });
      if (!data.success) {
        return toast({ title: "Error while marking helpful" });
      }

      setMarked(true);
      toast({ title: "Thank You for your response" });
    } catch (err) {
      console.log(err);
      toast({ title: "Error while marking helpful" });
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "p-3 rounded-md border",
          item.type === 1 ? "bg-green-900/15 mb-2" : "bg-black/10 mb-2"
        )}
      >
        {item.content}
      </div>
      {item.type === 1 && item.helpful === null && !marked && (
        <div className="flex flex-row-reverse mb-6">
          <div className="flex items-center space-x-4">
            <p className="text-md">Helpful</p>

            <ThumbsUp
              onClick={() => handleClick(true)}
              className="w-4 h-4 hover:text-green-300 hover:cursor-pointer"
            />

            <ThumbsDown
              onClick={() => handleClick(false)}
              className="w-4 h-4 hover:text-red-500 hover:cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatShow;
