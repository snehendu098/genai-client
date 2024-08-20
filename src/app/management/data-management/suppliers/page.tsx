import HorizontalShow from "@/components/management-framework/modules/horizontal-item-shower";
import VertialShow from "@/components/management-framework/modules/vertical-table-shower";
import {
  supplierGroupDummy,
  suppliersDummy,
} from "@/constants/management-framework/dummy";
import React from "react";
import { FcFolder } from "react-icons/fc";

const Page = () => {
  return (
    <div className="w-full pb-6  h-[calc(100vh-4rem)] overflow-hidden flex-1">
      {/* Templates */}
      <HorizontalShow
        data={supplierGroupDummy}
        icon={<FcFolder className="w-32 h-32" />}
        headerTxt="Supplier Groups"
        btnTxt="Create Group"
        redirectUrl="/modules/management/suppliers/create/group"
        baseUrl="/suppliers/groups"
      />
      {/* Suppliers */}
      <div className="w-full h-[65%]">
        <VertialShow
          data={suppliersDummy}
          btnText="Create Supplier"
          redirectUrl="/modules/management/suppliers/create"
          baseUrl="/suppliers"
        />
      </div>
    </div>
  );
};

export default Page;
