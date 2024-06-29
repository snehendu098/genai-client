import { topicAssessmentDummyData as dummyData } from "@/constants/dashboard";
import React from "react";

const App = () => {
  return Object.keys(dummyData).map((key, idx) => (
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
  ));
};

export default App;
