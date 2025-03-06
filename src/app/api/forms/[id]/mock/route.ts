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
      return NextResponse.json({ error: "Schema not found" }, { status: 404 });
    }
    const mockData = generateMock(schema);

    return NextResponse.json(mockData);
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
