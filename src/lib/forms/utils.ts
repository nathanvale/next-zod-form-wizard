import { z, ZodSchema } from "zod";

export function formatZodErrors(zodError: z.ZodError) {
  const errors = zodError.errors.reduce((acc, error) => {
    const path = error.path.join(".");
    if (!acc[path]) {
      acc[path] = [];
    }
    acc[path].push(error.message);
    return acc;
  }, {} as Record<string, string[]>);

  const formattedErrors = Object.entries(errors).map(([field, errors]) => ({
    field,
    errors,
  }));

  return { errors: formattedErrors };
}

export function fetchSchema(
  id: string,
  formSchemas: Record<string, ZodSchema>
): ZodSchema | null {
  if (!id) {
    throw new Error("Lodgment id doesn't exist.");
  }

  const schema = formSchemas[id];
  if (!schema) {
    return null;
  }

  return schema;
}

export function consoleLogAnySchemaErrors(data: any, schema: ZodSchema) {
  try {
    schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(formatZodErrors(error));
    }
  }
}
