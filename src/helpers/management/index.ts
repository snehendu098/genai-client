import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { Group } from "@/models/management-framework/Group.Supplier.Model";
import { Supplier } from "@/models/management-framework/Supplier.Model";

import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";

export async function getSupplierHomeData() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, message: "User not found" };
    }

    const _user: User = session?.user as User;

    if (!_user._id) {
      return { success: false, message: "User not found" };
    }

    const supplier = await Supplier.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $match: {
          owner: new mongoose.Types.ObjectId(_user._id),
        },
      },
    ]);

    const group = await Group.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $match: {
          owner: new mongoose.Types.ObjectId(_user._id),
        },
      },
    ]);

    return {
      success: true,
      supplier,
      group,
      message: "Suppliers fetched successfully",
    };
  } catch (err) {
    console.log("Error while fetching supplier", err);
    return {
      success: false,
      message: "Error while fetching supplier",
    };
  }
}
