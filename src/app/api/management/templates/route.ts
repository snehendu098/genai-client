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

    const { name, description }: { name: string; description: string } =
      await req.json();

    const template = new Template({ name, description, owner: _user._id });

    await template.save();

    return Response.json({ success: true, id: template.id });
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

export async function GET(_: Request) {
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

    const templates = await Template.aggregate([
      {
        $match: { owner: _user._id },
      },
      {
        $facet: {
          drafts: [
            {
              $match: { published: false },
            },
          ],
          published: [
            {
              $match: { published: true },
            },
          ],
        },
      },
    ]);

    const drafts = templates[0].drafts;
    const published = templates[0].published;

    return Response.json({ success: true, drafts, published });
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
