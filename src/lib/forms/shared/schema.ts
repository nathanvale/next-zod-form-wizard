import "zod-openapi/extend";
import { z } from "zod";

export const citySchema = z.string().openapi({ description: "City name" });
export const postcodeSchema = z.string().openapi({ description: "Postcode" });
export const searchSchema = z.string().openapi({ description: "Search term" });
export const stateSchema = z.string().openapi({ description: "State" });
export const streetSchema = z.string().openapi({ description: "Street name" });

export const addressSchema = z
  .object({
    city: citySchema,
    postcode: postcodeSchema,
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
    title: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
  })
  .openapi({ description: "Contact details" });

export const organisationSchema = z
  .object({
    abn: z.string(),
    name: z.string(),
  })
  .openapi({ description: "Organisation Details" });

export const applicantSchema = z
  .object({
    abn: organisationSchema,
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
    abn: organisationSchema,
  })
  .openapi({ description: "Representative details" });

export const respondentSchema = z
  .object({
    address: addressSchema,
    contact: contactSchema,
    profile: profileSchema,
    abn: organisationSchema,
  })
  .openapi({ description: "Respondent details" });

export const hiddenSchema = z
  .object({
    hidden: z.object({
      // The form id to identify the form
      id: z.string(),
      // The current step user is at in the form
      currentStep: z.number(),
      // Is it an f2 or f8 form?
      formDefinitionId: z.string(),
      // TODO: Is ther a currency type in zod?
      // The form usage fee
      fees: z.number(),
      // Last saved date
      lastSaved: z.string(),
    }),
  })
  .openapi({ description: "Hidden form details" });
