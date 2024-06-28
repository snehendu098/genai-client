import { dummyPDFLink } from "@/constants/dashboard";
import React from "react";

const App = () => {
  return (
    <div className="w-full h-screen flex">
      <iframe
        src={`https://docs.google.com/gview?url=${dummyPDFLink}&embedded=true`}
        className="w-1/2 h-full"
      ></iframe>
    </div>
  );
};

export default App;
