import HorizontalShow from "@/components/management-framework/modules/horizontal-item-shower";
import VertialShow from "@/components/management-framework/modules/vertical-table-shower";
import {
  suppliersDummy,
  templateDummy,
} from "@/constants/management-framework/dummy";
import React from "react";
import { FcFolder } from "react-icons/fc";

const Page = () => {
  return (
    <div className="w-full pb-6  h-[calc(100vh-4rem)] overflow-hidden flex-1">
      {/* Templates */}
      <HorizontalShow
        baseUrl="/"
        data={templateDummy}
        icon={<FcFolder className="w-32 h-32" />}
      />
      {/* Suppliers */}
      <div className="w-full h-[65%]">
        <VertialShow baseUrl="/" data={suppliersDummy} />
      </div>
    </div>
  );
};

export default Page;
