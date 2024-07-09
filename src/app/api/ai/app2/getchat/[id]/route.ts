import ChatModel from "@/models/Chat.model";

import mongoose from "mongoose";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const docId = params.id;

    if (!docId) {
      return new Response(
        JSON.stringify({ success: false, message: "Document ID is required" }),
        { status: 400 },
      );
    }

    const res = await ChatModel.find({
      doc: new mongoose.Types.ObjectId(docId),
    });

    if (!res.length) {
      return new Response(
        JSON.stringify({ success: false, message: "No chat history found" }),
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Chat history retrieved",
        chat: res,
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Error occurred:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
