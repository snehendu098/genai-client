import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { Template } from "@/models/management-framework/Templates.Model";

import { getServerSession, User } from "next-auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
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

    const id = params.id;

    const templateData = await Template.findById(id);

    if (!templateData) {
      return Response.json(
        { success: false, message: "No template found" },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      message: "Document fetched",
      templateData,
    });
  } catch (err) {
    console.log("Error while fetching single template", err);
    return Response.json(
      { success: false, message: "Error fetching single template" },
      { status: 400 }
    );
  }
}
