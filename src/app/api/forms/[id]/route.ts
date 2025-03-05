import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<any> | NextResponse<any>> => {
  const formData = request.body;
  if (!params.id) {
    throw new Error("Lodgment id doesn't exist.")
  }
  // Simulate saving data to a database or external service
  try {
    // Replace this with actual saving logic
    console.log("FORM SAVE:", params.id);
    return NextResponse.json({ id: params.id,message: 'FORM UPDATE' });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save form data" },
      { status: 500 }
    );
  }
};
//TODO: write get function. fetch from data using ID
export const GET = ()=>{}