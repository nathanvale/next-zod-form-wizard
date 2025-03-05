import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<any> | NextResponse<any>> => {
  try {
    if (!params.id) {
      throw new Error("Lodgment id doesn't exist.");
    }
    // Simulate saving data to a database or external service
    const formData = await request.json();
    console.log("Form data received:", formData);
    console.log("Saving a new draft form:", formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return NextResponse.json({
      formId: params.id,
      message: "FORM UPDATE",
      modifiedOn: `${Date.now()}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save form data" },
      { status: 500 }
    );
  }
};

//TODO: Implement GET method to fetch a saved form
export const GET = () => {
  return NextResponse.json({ message: "GET FORM" });
};
