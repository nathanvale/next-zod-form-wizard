import "zod-openapi/extend";
import { z } from "zod";

export const citySchema = z.string().openapi({ description: "City name" });
export const postcodeSchema = z.string().openapi({ description: "Postcode" });
export const searchSchema = z.string().openapi({ description: "Search term" });
export const stateSchema = z.string().openapi({ description: "State" });
export const streetSchema = z.string().openapi({ description: "Street name" });

// Combined address schema
export const addressSchema = z
  .object({
    city: citySchema,
    postcode: postcodeSchema,
    search: searchSchema,
    state: stateSchema,
    street: streetSchema,
  })
  .openapi({ description: "Address details" });

export const firstNameSchema = z
  .string()
  .min(1, { message: "First Name is required" });
export const lastNameSchema = z
  .string()
  .min(1, { message: "Last Name is required" });

export const profileSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
  })
  .openapi({ description: "Profile details" });

export const emailSchema = z.string().openapi({
  description: "Email address",
});
export const phoneSchema = z.string().openapi({
  description: "Phone number",
});

export const contactSchema = z
  .object({
    email: emailSchema,
    phone: phoneSchema,
  })
  .openapi({ description: "Contact details" });

export const abnSchema = z
  .object({
    abn: z.string(),
    legalName: z.string(),
    search: z.string().optional(),
  })
  .openapi({ description: "Australian Business Number" });

export const applicantSchema = z
  .object({
    abn: abnSchema,
    address: addressSchema,
    contact: contactSchema,
    profile: profileSchema,
  })
  .openapi({ description: "Applicant details" });

export const representativeSchema = z
  .object({
    address: addressSchema,
    contact: contactSchema,
    profile: profileSchema,
    abn: abnSchema,
  })
  .openapi({ description: "Representative details" });

export const respondentSchema = z
  .object({
    address: addressSchema,
    contact: contactSchema,
    profile: profileSchema,
    abn: abnSchema,
  })
  .openapi({ description: "Respondent details" });
