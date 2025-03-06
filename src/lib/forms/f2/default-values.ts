import { F2FieldValues } from "./types";

export const defaultValues: F2FieldValues = {
  applicant: {
    abn: {
      abn: "",
      legalName: "",
      search: "",
    },
    address: {
      city: "",
      postcode: "",
      search: "",
      state: "",
      street: "",
    },
    contact: {
      email: "",
      phone: "",
    },
    profile: {
      firstName: "",
      lastName: "",
    },
  },
  representative: {
    abn: {
      abn: "",
      legalName: "",
      search: "",
    },
    address: {
      city: "",
      postcode: "",
      search: "",
      state: "",
      street: "",
    },
    contact: {
      email: "",
      phone: "",
    },
    profile: {
      firstName: "",
      lastName: "",
    },
  },
  accessibility: "",
  age: "",
  interpreter: "",
  gender: "",
  height: "",
};
