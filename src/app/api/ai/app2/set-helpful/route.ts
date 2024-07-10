import ChatModel from "@/models/Chat.model";

export async function POST(req: Request) {
  try {
    const { chatId, helpful } = await req.json();

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
