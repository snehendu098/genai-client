import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import DocModel from "@/models/ai-toolbox/Doc.model";
import { authOptions } from "@/app/api/auth/[[...nextauth]]/options";
import { principlesChecklistDummy } from "@/constants/dashboard";
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

  try {
    // Fetch the document by ID
    const doc = await DocModel.findById(docId);

    // If document not found, return 404
    if (!doc) {
      return new Response(
        JSON.stringify({ success: false, message: "Document not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if a response of type 2 already exists
    const existingResponse = doc.responses?.find(
      (element) => element.type === 3
    );

    if (existingResponse) {
      // Return the existing response if found
      return new Response(
        JSON.stringify({
          success: true,
          message: "Doc response fetched successfully",
          data: JSON.parse(existingResponse.response),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: fetch ai data principle checklist, (check after formatting)

    const formData = new FormData();
    formData.append("pdf_id", doc.docs[0].id.toString());

    console.log("id", doc.docs[0].id);

    const { data } = await axios.post(`${baseUrl}/app1/esgAssess/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("data", data);
    // If no response of type 2, generate a new one
    const newResponse = {
      response: JSON.stringify(data),
      type: 3,
    } as IResponse;
    doc.responses = doc.responses || [];
    doc.responses.push(newResponse);
    await doc.save();

    // Return the new response
    return new Response(
      JSON.stringify({
        success: true,
        message: "AI response generated successfully",
        // TODO: destructure data for principles checklist
        data: data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error fetching response", err);
    // Return a 500 error if there was an issue with fetching the response
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching response" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
