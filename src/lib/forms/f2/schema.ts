import { z } from "zod";

import {
  applicantSchema,
  representativeSchema,
  respondentSchema,
} from "#lib/forms/shared/schema";

export const step1Schema = z.object({
  applicant: applicantSchema,
  representative: representativeSchema,
});

export const step2Schema = z.object({
  interpreter: z.string(),
});

export const step3Schema = z.object({
  accessibility: z.string(),
});

export const step4Schema = z.object({
  age: z.string(),
});

export const step5Schema = z.object({
  gender: z.string(),
});

export const step6Schema = z.object({
  height: z.string(),
});
export const f2Schema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema);
