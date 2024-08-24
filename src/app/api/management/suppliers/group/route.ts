import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { Group } from "@/models/management-framework/Group.Supplier.Model";
import mongoose from "mongoose";

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
    const { name, supplierIds }: { name: string; supplierIds: string[] } =
      await req.json();

    if (!_user.isApproved) {
      return Response.json(
        {
          success: false,
          message: "Approval Pending",
        },
        { status: 401 }
      );
    }

    const group = new Group({
      name,
      supplierIds: supplierIds.map(
        (item: string) => new mongoose.Types.ObjectId(item)
      ),
      owner: new mongoose.Types.ObjectId(_user._id),
    });

    await group.save();

    return Response.json({ success: true, message: "Group has been saved" });
  } catch (err) {
    console.log("Error while creating supplier", err);
    return Response.json({
      success: false,
      message: "Error while creation of supplier",
    });
  }
}
