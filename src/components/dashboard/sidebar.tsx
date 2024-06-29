import { cards } from "@/constants/home";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-full relative h-screen soff p-4 bg-gray-700/10 flex flex-col px-4">
      <Link href={"/"}>
        <h1>Example</h1>
      </Link>
      <div className="w-full flex flex-col space-y-1 mt-10">
        {cards.map((value, idx) => (
          <React.Fragment key={idx}>
            <Link href={`${value.link}`}>
              <div className="w-full px-4 py-2 rounded-md hover:bg-primary hover:text-gray-900 hover:font-bold text-lg hover:text-xl cursor-pointer transform duration-500 ">
                {value.name}
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 w-full p-4">
        <Button className="max-w-xs w-full" variant={"outline"}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
