import { NextRequest, NextResponse } from "next/server";
import { createSchema } from "zod-openapi";
import { formSchemas } from "#lib/forms";
import { fetchSchema } from "#lib/forms/utils";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<any>> => {
  try {
    const schema = fetchSchema(params.id, formSchemas);
    if (!schema) {
      return NextResponse.json(
        { status: 404, message: "Schema not found" },
        { status: 404 }
      );
    }
    const openApiSchema = createSchema(schema);

    return NextResponse.json({ openApiSchema });
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
