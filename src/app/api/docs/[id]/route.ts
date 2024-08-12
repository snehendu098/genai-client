import DocModel from "@/models/ai-toolbox/Doc.model";
import { authOptions } from "../../auth/[[...nextauth]]/options";
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

    const doc = await DocModel.findById(id);

    // console.log(doc);

    if (!doc) {
      return Response.json(
        { success: false, message: "No docuement found" },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      message: "Document fetched",
      data: doc,
      docs: doc.docs,
    });
  } catch (err) {
    console.log("Error while fetching single doc", err);
    return Response.json(
      { success: false, message: "Error fetching single doc" },
      { status: 400 }
    );
  }
}
