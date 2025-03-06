import { ZodSchema } from "zod";
import { schema as F2Schema } from "./f2";
import { schema as F8Schema } from "./f8";
import { FormId } from "./shared/types";

export const formSchemas: Record<FormId, ZodSchema> = {
  f2: F2Schema,
  f8: F8Schema,
};
