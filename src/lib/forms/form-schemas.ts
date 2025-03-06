import { ZodSchema } from "zod";
import { schema as F2Schema } from "./f2";
import { FormId } from "./shared/types";

export const formSchemas: Record<FormId, ZodSchema> = {
  f2: F2Schema,
};
