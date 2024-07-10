import ChatModel from "@/models/Chat.model";
import DocModel from "@/models/Doc.model";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const {
      docId,
      question,
      answer,
    }: { docId: string; question: string; answer: string } = await req.json();

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
