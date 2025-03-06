import { z, ZodSchema } from "zod";

export function formatZodErrors(zodError: z.ZodError) {
  const errors = zodError.errors.reduce((acc, error) => {
    const path = error.path.join(".");
    acc[path] = error.message;
    return acc;
  }, {} as Record<string, string>);
  return { errors };
}

export function parseZodSchema(formData: any, zodSchema: z.ZodSchema) {
  try {
    //TODO make sure there are no optional fields in the schema
    const validationResult = zodSchema.parse(formData);
    return validationResult.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(formatZodErrors(error));
      throw error;
    }
    throw error;
  }
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
