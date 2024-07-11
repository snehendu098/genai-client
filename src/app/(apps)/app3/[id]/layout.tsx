import AppLayouts from "@/components/dashboard/app-layout";
import React from "react";

const App = ({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) => {
  return <AppLayouts params={params}>{children} </AppLayouts>;
};

export default App;
