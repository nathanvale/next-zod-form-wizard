import {
  z,
  ZodTypeAny,
  ZodObject,
  ZodString,
  ZodNumber,
  ZodSchema,
  ZodArray,
} from "zod";
import { faker } from "@faker-js/faker";

// Recursive function to generate fake data based on a Zod schema
// function generateFakeData(schema: ZodTypeAny): any {
//   if (schema instanceof ZodObject) {
//     const shape = schema.shape;
//     const result: Record<string, any> = {};
//     for (const key in shape) {
//       result[key] = generateFakeData(shape[key]);
//     }
//     return result;
//   }

//   if (schema instanceof ZodString) {
//     if (schema.isEmail()) {
//       return faker.internet.email();
//     }
//     return faker.lorem.word();
//   }

//   if (schema instanceof ZodNumber) {
//     return faker.datatype.number();
//   }

//   if (schema instanceof ZodArray) {
//     const elementType = schema.element;
//     const length = faker.datatype.number({ min: 1, max: 5 });
//     return Array.from({ length }, () => generateFakeData(elementType));
//   }

//   // Add more cases as needed for other Zod types

//   throw new Error(`Unsupported schema type: ${schema.constructor.name}`);
// }

export function formatZodErrors(zodError: z.ZodError) {
  const errors = zodError.errors.reduce((acc, error) => {
    const path = error.path.join(".");
    acc[path] = error.message;
    return acc;
  }, {} as Record<string, string>);
  return { errors };
}

export function validateFormData(formData: any, zodSchema: z.ZodSchema) {
  try {
    const validationResult = zodSchema.parse(formData);
    return validationResult.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(formatZodErrors(error));
      return;
    }
    throw error;
  }
}
