import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[[...nextauth]]/options";
import { Supplier } from "@/models/management-framework/Supplier.Model";
import bcrypt from "bcryptjs";

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
    const { username, password, identifier } = await req.json();

    if (!_user.isApproved) {
      return Response.json(
        {
          success: false,
          message: "Approval Pending",
        },
        { status: 401 }
      );
    }

    const supplier = new Supplier({
      username,
      password: await bcrypt.hash(password, 10),
      owner: _user._id,
      identifier,
    });

    await supplier.save();

    return Response.json({ success: true, message: "Supplier has been saved" });
  } catch (err) {
    console.log("Error while creating supplier", err);
    return Response.json({
      success: false,
      message: "Error while creation of supplier",
    });
  }
}

export async function GET(req: Request) {
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

    const supplier = await Supplier.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $match: {
          owner: _user._id,
        },
      },
    ]);

    if (supplier.length === 0) {
      return Response.json({ success: true, message: "No supplier found" });
    }

    return Response.json({
      success: true,
      supplier,
      message: "Suppliers fetched successfully",
    });
  } catch (err) {
    console.log("Error while fetching supplier", err);
    return Response.json({
      success: false,
      message: "Error while fetching supplier",
    });
  }
}
