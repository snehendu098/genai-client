import { Button } from "@/components/ui/button";
import { cards } from "@/constants/home";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen">
      <div className="flex-[1] max-w-xs">
        {/* Sidebar */}
        <div className="w-full relative h-screen soff p-4 bg-gray-700/10 flex flex-col px-4">
          <h1>Example</h1>
          <div className="w-full flex flex-col space-y-1 mt-10">
            {cards.map((value, idx) => (
              <div
                key={idx}
                className="w-full px-4 py-2 rounded-md hover:bg-primary hover:text-gray-900 hover:font-bold text-lg hover:text-xl cursor-pointer transform duration-500 "
              >
                {value.name}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 w-full p-4">
            <Button className="max-w-xs w-full" variant={"outline"}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
