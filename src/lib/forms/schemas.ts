import { z } from 'zod'

type FieldMeta = {
  label: string
  placeholder?: string
}

function withMeta<T extends z.ZodTypeAny>(schema: T, meta: FieldMeta) {
  return schema.transform((value) => {
    value._meta = meta
    return value
  })
}

export function getMeta(schema: z.ZodTypeAny): FieldMeta | undefined {
  return (schema as any)._meta
}

export const applicantAddressSchema = z.object({
  city: withMeta(
    z.string().min(1, { message: 'City is required' }).default('Melbourne'),
    { label: 'City', placeholder: 'Enter city' },
  ),
  postcode: withMeta(
    z.string().min(1, { message: 'Postcode is required' }).default('3000'),
    { label: 'Postcode', placeholder: 'Enter postcode' },
  ),
  search: withMeta(z.string().optional().default(''), {
    label: 'Search',
    placeholder: 'Search address',
  }),
  state: withMeta(
    z.string().min(1, { message: 'State is required' }).default('VIC'),
    { label: 'State', placeholder: 'Enter state' },
  ),
  street: withMeta(
    z.string().min(1, { message: 'Street is required' }).default('123 Main St'),
    { label: 'Street', placeholder: 'Enter street' },
  ),
})

export const contactSchema = z.object({
  email: withMeta(
    z
      .string()
      .min(1, { message: 'Email is required' })
      .default('example@example.com'),
    { label: 'Email', placeholder: 'Enter email' },
  ),
  firstName: withMeta(
    z.string().min(1, { message: 'First Name is required' }).default(''),
    { label: 'First Name', placeholder: 'Enter first name' },
  ),
  lastName: withMeta(
    z.string().min(1, { message: 'Last Name is required' }).default(''),
    { label: 'Last Name', placeholder: 'Enter last name' },
  ),
  phone: withMeta(
    z.string().min(1, { message: 'Phone is required' }).default(''),
    { label: 'Phone', placeholder: 'Enter phone number' },
  ),
  role: withMeta(
    z.string().min(1, { message: 'Role is required' }).default(''),
    { label: 'Role', placeholder: 'Enter role' },
  ),
})

export const abnSchema = z.object({
  abn: withMeta(
    z.string().min(1, { message: 'ABN Number is required' }).default(''),
    { label: 'ABN Number', placeholder: 'Enter your ABN' },
  ),
  legalName: withMeta(
    z.string().min(1, { message: 'Legal Name is required' }).default(''),
    { label: 'Legal Name', placeholder: 'Enter legal name' },
  ),
  search: withMeta(z.string().optional().default(''), {
    label: 'Search',
    placeholder: 'Search ABN',
  }),
})
