import DocUpload from "@/components/ai-toolbox/dashboard/document-upload";
import React from "react";

const Page = () => {
  return (
    <DocUpload
      headTxt="Create a New Checklist"
      appType={"5"}
      title="AI-Powered ESG Governance"
      shortDesc="Upload an excel file to get started"
    />
  );
};

export default Page;
