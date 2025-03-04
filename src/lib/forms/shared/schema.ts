import { z } from "zod";

// TODO: create hidden fields schema
// currentStep: 'applicant',
// applicantIsAnother: false,
// lastSaved:""

export const citySchema = z.string();
export const postcodeSchema = z.string();
export const searchSchema = z.string().optional();
export const stateSchema = z.string();
export const streetSchema = z.string();

// Combined address schema
export const addressSchema = z.object({
  city: citySchema,
  postcode: postcodeSchema,
  search: searchSchema,
  state: stateSchema,
  street: streetSchema,
});

export const firstNameSchema = z
  .string()
  .min(1, { message: "First Name is required" });
export const lastNameSchema = z
  .string()
  .min(1, { message: "Last Name is required" });
export const phoneSchema = z.string();

export const profileSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phone: phoneSchema,
});

export const emailSchema = z.string();
export const contactPhoneSchema = z.string(); // Named differently to avoid conflict with profile's phone

export const contactSchema = z.object({
  email: emailSchema,
  phone: contactPhoneSchema,
});

export const abnSchema = z.object({
  abn: z.string(),
  legalName: z.string(),
  search: z.string().optional(),
});

export const applicantSchema = z.object({
  abn: abnSchema,
  address: addressSchema,
  contact: contactSchema,
  profile: profileSchema,
});

export const representativeSchema = z.object({
  address: addressSchema,
  contact: contactSchema,
  profile: profileSchema,
  abn: abnSchema,
});

export const respondentSchema = z.object({
  address: addressSchema,
  contact: contactSchema,
  profile: profileSchema,
  abn: abnSchema,
});
