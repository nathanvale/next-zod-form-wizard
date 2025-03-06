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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({
      status: 200,
      message: "Form successfully updated",
      data: {
        formId: params.id,
        modifiedOn: `${Date.now()}`,
      },
    });
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
