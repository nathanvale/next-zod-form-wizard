import { z, ZodSchema } from "zod";
import { organisationSchema, addressSchema, contactSchema } from "./schema";

export type FormId = "f2" | "f8";

export type FieldMeta = {
  label: string;
  placeholder?: string;
  description?: string;
};

export type AddressFields = z.infer<typeof addressSchema>;
export type AbnFields = z.infer<typeof organisationSchema>;
export type ContactFields = z.infer<typeof contactSchema>;
