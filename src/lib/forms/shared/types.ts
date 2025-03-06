import { z, ZodSchema } from "zod";
import { abnSchema, addressSchema, contactSchema } from "./schema";

export type FormId = "f2";

export type FieldMeta = {
  label: string;
  placeholder?: string;
  description?: string;
};

export type AddressFields = z.infer<typeof addressSchema>;
export type AbnFields = z.infer<typeof abnSchema>;
export type ContactFields = z.infer<typeof contactSchema>;
