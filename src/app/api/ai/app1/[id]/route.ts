import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import DocModel from "@/models/ai-toolbox/Doc.model";
import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { topicAssessmentDummyData } from "@/constants/dashboard";
import { IResponse } from "@/models/ai-toolbox/Response.model";
import axios from "axios";
import { baseUrl } from "@/constants";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const docId = params.id;

  // Connect to the database
  await dbConnect();

  // Get user session
  const session = await getServerSession(authOptions);
  const user: User | undefined = session?.user as User | undefined;

  // Check if user is authenticated
  if (!session || !user) {
    return new Response(
      JSON.stringify({ success: false, message: "Please login first" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!user.isApproved) {
    return Response.json(
      {
        success: false,
        message: "Approval Pending",
      },
      { status: 401 }
    );
  }

  try {
    // Fetch the document by ID
    const doc = await DocModel.findById(docId);

    // If document not found, return 404
    if (!doc || doc.docs.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Document not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if a response of type 1 already exists
    const existingResponse = doc.responses?.find(
      (element) => element.type === 1
    );

    if (existingResponse) {
      // Return the existing response if found
      console.log(existingResponse.response);
      return new Response(
        JSON.stringify({
          success: true,
          message: "Doc response fetched successfully",
          data: JSON.parse(existingResponse.response),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("hello 1", doc.docs);

    // TODO: api req to get summarization

    const formData = new FormData();
    formData.append("pdf_id", doc.docs[0].id.toString());

    const { data } = await axios.post(
      `${baseUrl}/app1/esgSummarize/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("h1llo 2", data);

    // If no response of type 1, generate a new one
    // TODO: data destructuring
    const newResponse = {
      response: JSON.stringify(data),
      type: 1,
    } as IResponse;
    doc.responses = doc.responses || [];
    doc.responses.push(newResponse);
    await doc.save();

    console.log("response saved");

    // Return the new response
    return new Response(
      JSON.stringify({
        success: true,
        message: "AI response generated successfully",
        data: topicAssessmentDummyData,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error fetching response:", err);
    // Return a 500 error if there was an issue with fetching the response
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
