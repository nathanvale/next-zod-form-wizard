import { AnyZodTuple } from "../../../../node_modules/zod/lib/types";
import { schema } from "#lib/forms/f2";
import { formatZodErrors } from "#lib/forms/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stat } from "fs";

export const POST = async (
  request: NextRequest
): Promise<NextResponse<any> | NextResponse<any>> => {
  try {
    // Simulate submitting a lodgment
    const formData = await request.json();
    console.log("Form data received:", formData);
    //schema.parse(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        status: 200,
        message: "Lodgment submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    const errorMessage = "Bad Request: Invalid form data submitted.";
    if (error instanceof z.ZodError) {
      const { errors } = formatZodErrors(error);
      return NextResponse.json(
        {
          status: 400,
          error: "Bad Request",
          message: "Invalid input data",
          details: errors,
        },
        { status: 400 }
      );
    }
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
