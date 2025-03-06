import { AnyZodTuple } from "./../../../../node_modules/zod/lib/types.d";
import { schema } from "#lib/forms/f2";
import { formatZodErrors, parseZodSchema } from "#lib/forms/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (
  request: NextRequest
): Promise<NextResponse<any> | NextResponse<any>> => {
  try {
    // Simulate submitting a lodgment
    const formData = await request.json();
    console.log("Form data received:", formData);
    parseZodSchema(formData, schema);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(
      { message: "Lodgment submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    const errorMessage = "Failed to save form data";
    if (error instanceof z.ZodError) {
      const { errors } = formatZodErrors(error);
      return NextResponse.json(
        { error: errorMessage, errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
