import { f2Schema } from "#lib/forms/f2";
import { validateFormData } from "#lib/forms/shared/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest
): Promise<NextResponse<any> | NextResponse<any>> => {
  const formData = request.body;

  // Validate form data
  const validationResult = validateFormData(formData, f2Schema);
  if (!validationResult) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  // Simulate saving data to a database or external service
  try {
    // Replace this with actual saving logic
    console.log("SUBMIT LODGMENT:", validationResult);
    return NextResponse.json(
      { message: "SUBMIT LODGMENT successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save form data" },
      { status: 500 }
    );
  }
};
