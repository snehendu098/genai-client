import {
  supplierGroupDummy,
  suppliersDummy,
  templateDummy,
} from "@/constants/dummy";
import React from "react";
import HorizontalShow from "@/components/modules/horizontal-item-shower";
import TableShower from "@/components/modules/vertical-table-shower";
import { FcFolder } from "react-icons/fc";

const Page = () => {
  return (
    <div className="w-full pb-6  h-[calc(100vh-4rem)] overflow-hidden flex-1">
      {/* Templates */}
      <HorizontalShow
        data={templateDummy}
        icon={<FcFolder className="w-32 h-32" />}
      />
      {/* Suppliers */}
      <div className="w-full h-[65%]">
        <TableShower data={suppliersDummy} />
      </div>
    </div>
  );
};

export default Page;
