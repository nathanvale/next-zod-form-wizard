import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest
): Promise<NextResponse<any> | NextResponse<any>> => {
  const formData = request.body;

  // Simulate saving data to a database or external service
  try {
    // Replace this with actual saving logic
    console.log("FORM SAVE:", formData);
    return NextResponse.json({ id: "this_is_random_id_generated_by_crm" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save form data" },
      { status: 500 }
    );
  }
};
