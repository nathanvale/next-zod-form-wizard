import { F2FormData } from "./types";

export const defaultValues: F2FormData = {
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
