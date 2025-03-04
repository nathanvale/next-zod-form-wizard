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
  respondent: respondentSchema,
});

export const f2Schema = step1Schema.merge(step2Schema);
