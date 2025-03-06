import {
  contactSchema,
  hiddenSchema,
  organisationSchema,
} from "./../shared/schema";
import { z } from "zod";
import { addressSchema } from "#lib/forms/shared/schema";

const applicantSchema = z.object({
  isAnother: z.boolean(),
  isAdult: z.boolean(),
  ...contactSchema.shape,
  address: addressSchema,
  isInterpreterRequired: z.boolean(),
  interpreterLanguage: z.string(),
  isAccessibiltyRequired: z.boolean(),
  accessibilityType: z.string(),
  industrialAssociation: z.object({
    isAssociated: z.boolean(),
    name: z.string(),
    abn: z.string(),
    address: addressSchema,
    contact: contactSchema,
  }),
  representative: z.object({
    isApplicatantRepresented: z.boolean(),
    // TODO: Make and enum as could be "Lawyer" or "Paid Agent" or "None"
    lawyerOrPaidAgent: z.string(),
    ...contactSchema.shape,
    organisation: organisationSchema,
    address: addressSchema,
  }),
});

export const step1Schema = z.object({});

export const step2Schema = z.object({
  ...applicantSchema.shape,
});

export const step3Schema = z.object({});

export const step4Schema = z.object({});

export const step5Schema = z.object({});

export const step6Schema = z.object({});

export const schema = hiddenSchema
  .merge(step1Schema)
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema);
