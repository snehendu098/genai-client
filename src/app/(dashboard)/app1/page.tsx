import { dummyData } from "@/constants/app1";
import { dummyPDFLink } from "@/constants/dashboard";
import React from "react";

const App = () => {
  return (
    <div className="w-full h-screen flex">
      <iframe
        src={`https://docs.google.com/gview?url=${dummyPDFLink}&embedded=true`}
        className="w-1/2 h-full"
      ></iframe>
      <div className="w-1/2 h-full flex flex-col overflow-y-auto p-10">
        {Object.keys(dummyData).map((key, idx) => (
          <div key={idx}>
            <h1>{key}</h1>
            {Object.keys(dummyData[key]).map((subhead, idx) => (
              <div
                key={idx}
                className="flex flex-col p-8 bg-yellow-950/15 rounded-md shadow-white my-4"
              >
                <p className="text-xl">{subhead}</p>
                {dummyData[key][subhead].map((point, idx) => (
                  <p key={idx} className="text-sm my-2 text-muted-foreground ">
                    {point}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
