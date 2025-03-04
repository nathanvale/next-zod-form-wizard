import { FieldMeta } from "#lib/forms/shared/types";
import { FieldValues, Path } from "react-hook-form";
import { F2FieldNames, F2FormData } from "./types";
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
  "applicant.profile.phone": META_PHONE,
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
  "representative.profile.phone": META_PHONE,
  "representative.contact.email": META_EMAIL,
  "representative.contact.phone": META_PHONE,
  "representative.abn.abn": META_ABN,
  "representative.abn.legalName": META_LEGAL_NAME,
  "representative.abn.search": META_SEARCH,
  "respondent.address.city": META_CITY,
  "respondent.address.postcode": META_POSTCODE,
  "respondent.address.search": META_SEARCH,
  "respondent.address.state": META_STATE,
  "respondent.address.street": META_STREET,
  "respondent.profile.firstName": META_FIRST_NAME,
  "respondent.profile.lastName": META_LAST_NAME,
  "respondent.profile.phone": META_PHONE,
  "respondent.contact.email": META_EMAIL,
  "respondent.contact.phone": META_PHONE,
  "respondent.abn.abn": META_ABN,
  "respondent.abn.legalName": META_LEGAL_NAME,
  "respondent.abn.search": META_SEARCH,
};

const f2MetadataMap = new Map<Path<F2FormData>, FieldMeta>(
  Object.entries(metadataObject) as [Path<F2FormData>, FieldMeta][]
);

export function getMeta<T = F2FieldNames>(key: T): FieldMeta {
  return (
    f2MetadataMap.get(key as any) ?? {
      label: `Missing label for ${key}!`,
    }
  );
}
