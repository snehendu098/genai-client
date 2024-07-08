import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import DocModel from "@/models/Doc.model";
import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { topicAssessmentDummyData } from "@/constants/dashboard";
import { IResponse } from "@/models/Response.model";

export async function GET(
  _: Request,
  { params }: { params: { props: string[] } },
) {
  const docId = params.props[0];
  const docType = Number(params.props[1]);

  // Connect to the database
  await dbConnect();

  // Get user session
  const session = await getServerSession(authOptions);
  const user: User | undefined = session?.user as User | undefined;

  // Check if user is authenticated
  if (!session || !user) {
    return new Response(
      JSON.stringify({ success: false, message: "Please login first" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    // Fetch the document by ID
    const doc = await DocModel.findById(docId);

    // If document not found, return 404
    if (!doc) {
      return new Response(
        JSON.stringify({ success: false, message: "Document not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if a response of type 1 already exists
    const existingResponse = doc.responses?.find(
      (element) => element.type === docType,
    );

    if (existingResponse) {
      // Return the existing response if found
      return new Response(
        JSON.stringify({
          success: true,
          message: "Doc response fetched successfully",
          data: JSON.parse(existingResponse.response),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }
    // TODO;api req to fetch ai data
    // If no response of type 1, generate a new one
    const newResponse = {
      response: JSON.stringify(topicAssessmentDummyData),
      type: docType,
    } as IResponse;
    doc.responses = doc.responses || [];
    doc.responses.push(newResponse);
    await doc.save();

    // Return the new response
    return new Response(
      JSON.stringify({
        success: true,
        message: "AI response generated successfully",
        data: topicAssessmentDummyData,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Error fetching response", err);
    // Return a 500 error if there was an issue with fetching the response
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching response" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
