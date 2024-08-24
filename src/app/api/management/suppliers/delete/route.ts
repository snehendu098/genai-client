import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { Supplier } from "@/models/management-framework/Supplier.Model";

import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    const _user: User = session?.user as User;

    if (!_user._id) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    const { _id }: { _id: string } = await req.json();

    await Supplier.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });

    return Response.json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (err) {
    console.log("Error while fetching supplier", err);
    return Response.json({
      success: false,
      message: "Error while fetching supplier",
    });
  }
}
