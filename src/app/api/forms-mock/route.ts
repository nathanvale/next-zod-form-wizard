import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest
): Promise<NextResponse<any> | NextResponse<any>> => {
  try {
    // Simulate saving data to a database or external service
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json(
      {
        status: 200,
        message: "Form successfully saved",
        data: { formId: "123456789", modifiedOn: `${Date.now()}` },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        error: "Internal Server Error",
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};
