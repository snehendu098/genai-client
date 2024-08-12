import ChatModel from "@/models/ai-toolbox/Chat.model";
import DocModel from "@/models/ai-toolbox/Doc.model";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[[...nextauth]]/options";

export async function POST(req: Request) {
  try {
    const {
      docId,
      question,
      answer,
    }: { docId: string; question: string; answer: string } = await req.json();

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

    if (!docId || !question || !answer) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const doc = await DocModel.findById(docId);
    if (!doc) {
      return new Response(
        JSON.stringify({ success: false, message: "Document not found" }),
        { status: 404 }
      );
    }

    const chat = new ChatModel({ doc: docId, answer, question });
    doc.chatId?.push(new mongoose.Types.ObjectId(docId));
    await doc.save();
    await chat.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Chat saved successfully",
        chat,
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
