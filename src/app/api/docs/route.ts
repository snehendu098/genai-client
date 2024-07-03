import dbConnect from "@/lib/dbConnect";
import DocModel from "@/models/Doc.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[[...nextauth]]/options";
import { User } from "next-auth";
import UserModel from "@/models/User.model";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { url, id } = await req.json();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user as User;

    if (!session || !_user) {
      return Response.json(
        { success: false, message: "Please login first" },
        { status: 401 },
      );
    }

    const newDoc = new DocModel({ url, _id: id, responses: [] });

    await newDoc.save();
    const user = await UserModel.findOne({ email: _user.email });

    if (user) {
      user?.docsGenerated.push(newDoc.id);
      console.log(user);
      await user?.save();

      return Response.json({ success: true });
    } else {
      return Response.json({ success: false });
    }
  } catch (err) {
    console.log("error while handling docs upload", err);
    return Response.json({
      success: false,
      message: "Error occurred while uploading docs",
    });
  }
}
