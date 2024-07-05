import DocModel from "@/models/Doc.model";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    const doc = await DocModel.findById(id);

    console.log(doc);

    if (!doc) {
      return Response.json(
        { success: false, message: "No docuement found" },
        { status: 401 },
      );
    }

    return Response.json({
      success: true,
      message: "Document fetched",
      data: doc,
    });
  } catch (err) {
    console.log("Error while fetching single doc", err);
    return Response.json(
      { success: false, message: "Error fetching single doc" },
      { status: 400 },
    );
  }
}
