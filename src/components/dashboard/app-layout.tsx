import React from "react";

const AppLayouts = ({
  pdfLink,
  children,
}: {
  pdfLink: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="max-h-screen flex-1  ">
      <div className="w-full h-screen flex">
        <iframe
          src={`https://docs.google.com/gview?url=${pdfLink}&embedded=true`}
          className="w-1/2 h-full"
        ></iframe>

        <div className="w-1/2 h-full flex flex-col overflow-y-auto p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayouts;
