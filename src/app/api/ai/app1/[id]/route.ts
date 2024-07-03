import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import DocModel from "@/models/Doc.model";
import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { topicAssessmentDummyData } from "@/constants/dashboard";
import { IResponse } from "@/models/Response.model";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const docId = params.id;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Please login first" },
      { status: 401 },
    );
  }

  try {
    // fetch document
    const doc = await DocModel.findById(docId);

    const responsesExist = doc?.responses && doc?.responses.length > 0;

    // check if response type is 1
    if (!responsesExist) {
      // hit the api endpoint and fetch the data
      const res = topicAssessmentDummyData;
      doc?.responses.push({
        response: JSON.stringify(res),
        type: 1,
      } as IResponse);
      await doc?.save();
      return Response.json({
        success: true,
        message: "Ai response generated successfuly",
        data: res,
      });
    }

    const responseTypeExists = doc.responses.some(
      (element) => element.type === 1,
    );

    if (responseTypeExists) {
      let docResponse = doc.responses.find((element) => element.type === 1);
      if (docResponse?.response) {
        return Response.json({
          success: true,
          message: "Doc response fetched successfully",
          data: JSON.parse(docResponse.response),
        });
      } else {
        console.log("No response found");
        return Response.json({
          success: false,
          message: "Doc response not found",
        });
      }
    }
  } catch (err) {
    console.log("Error fetching response", err);
    return Response.json(
      {
        success: false,
        message: "Error fetching response",
      },
      { status: 500 },
    );
  }
}
