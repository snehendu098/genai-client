import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { Template } from "@/models/management-framework/Templates.Model";
import { getServerSession, User } from "next-auth";

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

    if (!_user._id) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    const {
      id,
      publish,
      questionsJson,
    }: { id: string; publish: boolean; questionsJson: string } =
      await req.json();

    const template = await Template.findById(id);

    if (!template) {
      return Response.json(
        { success: false, message: "No template found" },
        { status: 400 }
      );
    }

    template.published = publish;
    template.questionsJson = JSON.parse(questionsJson); // eslint-disable-line

    await template.save();

    return Response.json({
      success: true,
      message: "Template has been created",
    });
  } catch (err) {
    console.log("Error while creating template", err);
    return Response.json(
      {
        success: false,
        message: "Error while creating template",
      },
      { status: 400 }
    );
  }
}
