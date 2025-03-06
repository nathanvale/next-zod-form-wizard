import { formSchemas } from "#lib/forms";
import { NextRequest, NextResponse } from "next/server";
import { generateMock } from "@anatine/zod-mock";
import { fetchSchema } from "#lib/forms/utils";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<any>> => {
  console.error("Fetching form schema for:", params);
  try {
    const schema = fetchSchema(params.id, formSchemas);
    if (!schema) {
      return NextResponse.json(
        { status: 400, message: "Schema not found" },
        { status: 404 }
      );
    }
    const mockData = generateMock(schema);

    return NextResponse.json(mockData);
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
