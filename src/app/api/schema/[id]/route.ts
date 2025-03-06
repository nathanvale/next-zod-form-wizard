import { openApiSchema } from "./../../../../lib/forms/shared/utils";
import { formSchemas } from "#lib/forms";
import { NextRequest, NextResponse } from "next/server";
import { generateMock } from "@anatine/zod-mock";
import { createSchema } from "zod-openapi";
import { ZodSchema } from "zod";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<any>> => {
  console.error("Fetching form schema for:", params);
  try {
    if (!params.id) {
      throw new Error("Lodgment id doesn't exist.");
    }
    console.error(params);
    const { id } = params;

    const schema = (formSchemas as Record<string, ZodSchema>)[id];

    const openApiSchema = createSchema(schema);
    const mockData = generateMock(schema);
    console.log("Schema:", openApiSchema);

    if (!schema) {
      return NextResponse.json({ error: "Schema not found" }, { status: 404 });
    }

    return NextResponse.json({ schema: openApiSchema, mockData });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch form schema",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
