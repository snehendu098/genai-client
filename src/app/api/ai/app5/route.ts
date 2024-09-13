export async function POST(req: Request) {
  try {
    const {
      type,
      row_id,
      arrays,
    }: {
      type: number;
      row_id: number;
      arrays: { modifiable: any[][]; actual: any[][] };
    } = await req.json();

    switch (type) {
      case 1:
        // gaps handle
        return Response.json({ success: true, gaps: [], modified: [] });

      case 2:
        // duplicates handle
        return Response.json({ success: true, gaps: [], modified: [] });

      case 3:
        // anomalies handle
        return Response.json({});

      default:
        return Response.json(
          { success: false, message: "No types matched" },
          { status: 400 }
        );
    }
  } catch (err) {
    console.log("Error while handling app5 actions:\n", err);
    return Response.json(
      { success: false, message: "Error occurred while handling app5 actions" },
      { status: 400 }
    );
  }
}
