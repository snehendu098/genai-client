import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import ChatModel from "@/models/ai-toolbox/Chat.model";

import { getServerSession, User } from "next-auth";

export async function POST(req: Request) {
  try {
    const { chatId, helpful } = await req.json();

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

    if (!chatId) {
      return new Response(
        JSON.stringify({ success: false, message: "Chat ID is required" }),
        { status: 400 }
      );
    }

    const chat = await ChatModel.findById(chatId);

    if (!chat) {
      return new Response(
        JSON.stringify({ success: false, message: "No chat found" })
      );
    }

    chat.helpful = helpful;
    await chat.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Chat updated",
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
