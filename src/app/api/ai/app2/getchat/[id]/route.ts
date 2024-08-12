import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import ChatModel from "@/models/ai-toolbox/Chat.model";

import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const docId = params.id;
    console.log("docis", docId);
    const session = await getServerSession(authOptions);
    const _user: User = session?.user as User;

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

    if (!docId) {
      return new Response(
        JSON.stringify({ success: false, message: "Document ID is required" }),
        { status: 400 }
      );
    }

    const res = await ChatModel.find({
      doc: new mongoose.Types.ObjectId(docId),
    }).sort({ createdAt: -1 });

    let arr: any = [];
    for (let i = 0; i < res.length; i++) {
      const item = res[i];
      arr.push({ content: item.question, type: 0 });
      arr.push({
        content: item.answer,
        type: 1,
        id: item.id,
        helpful: item.helpful,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Chat history retrieved",
        chat: arr,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error occurred:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
