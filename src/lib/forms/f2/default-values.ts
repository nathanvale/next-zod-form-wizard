import { F2FieldData } from "./types";

export const defaultValues: F2FieldData = {
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
      phone: "",
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
      phone: "",
    },
  },
  accessibility: "",
  age: "",
  interpreter: "",
  gender: "",
  height: "",
};
