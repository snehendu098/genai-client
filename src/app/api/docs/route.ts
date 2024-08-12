import dbConnect from "@/lib/dbConnect";
import DocModel, { SingleDoc } from "@/models/ai-toolbox/Doc.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[[...nextauth]]/options";
import { User } from "next-auth";
import UserModel from "@/models/User.model";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const {
      docs,
      id,
      name,
      chatInitiate,
    }: { docs: SingleDoc[]; id: string; name: string; chatInitiate: boolean } =
      await req.json();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user as User;

    //  console.log("cnt", { url, id, name, chatInitiate });

    if (!session || !_user) {
      return Response.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      );
    }

    if (!_user.isApproved) {
      return Response.json(
        {
          success: false,
          message: "Approval Pending",
        },
        { status: 401 }
      );
    }

    const newDoc = new DocModel({
      docs,
      _id: new mongoose.Types.ObjectId(id),
      responses: [],
      name,
      owner: _user._id,
      chatId: null,
      chatInitiate,
    });

    await newDoc.save();
    const user = await UserModel.findOne({ email: _user.email });

    if (user) {
      user?.docsGenerated.push(newDoc.id);
      // console.log(user);
      await user?.save();

      return Response.json({
        success: true,
        message: "Document has been uploaded",
        id: newDoc.id,
      });
    } else {
      return Response.json(
        { success: false, message: "Document uploading failed" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log("error while handling docs upload", err);
    return Response.json(
      {
        success: false,
        message: "Error occurred while uploading docs",
      },
      { status: 500 }
    );
  }
}

export async function GET(_: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      { succes: false, message: "Please log in first" },
      { status: 401 }
    );
  }

  try {
    const docs = await DocModel.find({
      owner: new mongoose.Types.ObjectId(_user._id),
    });

    if (docs) {
      return Response.json({
        success: true,
        message: "Fetched the docs successfully",
        docs,
      });
    } else {
      return Response.json(
        { success: false, message: "Couldn't fetch docs" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log("Error while fetching docs", err);
    return Response.json(
      { success: false, message: "Couldn't fetch docs" },
      { status: 500 }
    );
  }
}
