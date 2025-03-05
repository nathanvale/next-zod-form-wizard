import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest
): Promise<NextResponse<any> | NextResponse<any>> => {
  try {
    // Simulate saving data to a database or external service
    const formData = await request.json();
    console.log("Form data received:", formData);
    console.log("Saving to an exisitng draft form:", formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return NextResponse.json(
      { formId: "123456789", modifiedOn: `${Date.now()}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { error: "Failed to save form data" },
      { status: 500 }
    );
  }
};
