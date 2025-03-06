import {
  applicantSchema,
  contactSchema,
  hiddenSchema,
  organisationSchema,
} from "./../shared/schema";
import { z } from "zod";
import { addressSchema } from "#lib/forms/shared/schema";
import test from "node:test";

export const step1Schema = z.object({});

export const step2Schema = z.object({
  applicant: applicantSchema,
});

export const step3Schema = z.object({
  employer: z.object({
    ...organisationSchema.shape,
    address: addressSchema,
    ...contactSchema.omit({ title: true, firstName: true, lastName: true })
      .shape,
    // This comes from a select box of 1-14,15-49,50-99,100+ (14,49,99,100 or -1 = "I don't know")
    size: z.number(),
    contact: contactSchema.extend({
      role: z.string(), // This comes from a select box of "Owner", "Manager", "HR", "Other"
    }),
  }),
});

export const step4Schema = z.object({
  timeline: z.object({
    startDate: z.string(),
    endDate: z.string(),
    dismissalNotificationDate: z.string(),
    isStartDateUnknown: z.boolean(),
    is21DaysExceeded: z.boolean(),
    reasonFor21DaysExceeded: z.string(),
    hasMadeAnotherClaimRegardingDismissal: z.string(),
    hasMadeClaimRegardDismissal: z.boolean(),
  }),
});

export const step5Schema = z.object({
  dismissal: z.object({
    desiredOutcome: z
      .string()
      .max(20000, { message: "Maximum 20000 characters allowed" }),
    reasonForDismissal: z
      .string()
      .max(20000, { message: "Maximum 20000 characters allowed" }),
    whyWasDismissalUnfair: z
      .string()
      .max(20000, { message: "Maximum 20000 characters allowed" }),
  }),
});

export const step6Schema = z.object({
  test: z.string().min(1, { message: "This is a test" }),
});

export const schema = hiddenSchema
  .merge(step1Schema)
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema);
