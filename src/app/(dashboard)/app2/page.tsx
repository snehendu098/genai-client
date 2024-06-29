import TableDataShow from "@/components/dashboard/table-shower";
import { principlesChecklistDummy } from "@/constants/dashboard";
import React from "react";

const App = () => {
  return principlesChecklistDummy.map((value, idx) => (
    <TableDataShow key={idx} value={value} />
  ));
};

export default App;
