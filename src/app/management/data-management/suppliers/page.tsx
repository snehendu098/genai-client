import HorizontalShow from "@/components/management-framework/modules/horizontal-item-shower";
import VertialShow from "@/components/management-framework/modules/vertical-table-shower";
import { getSupplierHomeData } from "@/helpers/management";
import React from "react";
import { FcManager } from "react-icons/fc";

const Page = async () => {
  const { supplier, group } = await getSupplierHomeData();

  return (
    <div className="w-full pb-6  h-[calc(100vh-4rem)] overflow-hidden flex-1">
      {/* Templates */}

      <HorizontalShow
        data={group || []}
        icon={<FcManager className="w-32 h-32" />}
        headerTxt="Supplier Groups"
        btnTxt="Create Group"
        redirectUrl="/management/data-management/suppliers/create/group"
        baseUrl="/suppliers/groups"
      />

      {/* Suppliers */}

      <div className="w-full h-[65%]">
        <VertialShow
          data={supplier || []}
          btnText="Create Supplier"
          redirectUrl="/management/data-management/suppliers/create"
          baseUrl="/suppliers"
        />
      </div>
    </div>
  );
};

export default Page;
