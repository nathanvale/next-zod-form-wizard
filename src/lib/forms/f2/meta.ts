import { FieldMeta } from "#lib/forms/shared/types";
import { FieldValues, Path } from "react-hook-form";
import { F2FieldNames, F2FieldValues } from "./types";
import {
  META_ABN,
  META_CITY,
  META_EMAIL,
  META_FIRST_NAME,
  META_LAST_NAME,
  META_LEGAL_NAME,
  META_PHONE,
  META_POSTCODE,
  META_SEARCH,
  META_STATE,
  META_STREET,
} from "../shared/constants";

const metadataObject: Record<F2FieldNames, FieldMeta> = {
  "applicant.address.city": META_CITY,
  "applicant.address.postcode": META_POSTCODE,
  "applicant.address.search": META_SEARCH,
  "applicant.address.state": META_STATE,
  "applicant.address.street": META_STREET,
  "applicant.profile.firstName": META_FIRST_NAME,
  "applicant.profile.lastName": META_LAST_NAME,
  "applicant.contact.email": META_EMAIL,
  "applicant.contact.phone": META_PHONE,
  "applicant.abn.abn": META_ABN,
  "applicant.abn.legalName": META_LEGAL_NAME,
  "applicant.abn.search": META_SEARCH,
  "representative.address.city": META_CITY,
  "representative.address.postcode": META_POSTCODE,
  "representative.address.search": META_SEARCH,
  "representative.address.state": META_STATE,
  "representative.address.street": META_STREET,
  "representative.profile.firstName": META_FIRST_NAME,
  "representative.profile.lastName": META_LAST_NAME,
  "representative.contact.email": META_EMAIL,
  "representative.contact.phone": META_PHONE,
  "representative.abn.abn": META_ABN,
  "representative.abn.legalName": META_LEGAL_NAME,
  "representative.abn.search": META_SEARCH,
  accessibility: {
    label: "Accessibility",
    placeholder: "Enter accessibility",
  },
  age: {
    label: "Age",
    placeholder: "Enter age",
  },
  height: {
    label: "Height",
    placeholder: "Enter height",
  },
  gender: {
    label: "Gender",
    placeholder: "Gender",
  },
  interpreter: {
    label: "Interpreter",
    placeholder: "Interpreter",
  },
};

const f2MetadataMap = new Map<Path<F2FieldValues>, FieldMeta>(
  Object.entries(metadataObject) as [Path<F2FieldValues>, FieldMeta][]
);

export function getMeta<T = F2FieldNames>(key: T): FieldMeta {
  return (
    f2MetadataMap.get(key as any) ?? {
      label: `Missing label for ${key}!`,
    }
  );
}
