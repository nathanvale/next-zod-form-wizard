import { Step1 } from "../../../components/form/f2/step-1";
import { z } from "zod";
import {
  step1Schema,
  step2Schema,
  f2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
} from "./schema";
import { Path } from "react-hook-form";

// type AllFieldNames = Path<F2FormData>;
// type Step1FieldNames = Path<Step1FieldData>;
// type Step2FieldNames = Path<Step2FieldData>;

type OmittedPathsUnion =
  | "applicant"
  | "applicant.profile"
  | "applicant.contact"
  | "applicant.address"
  | "applicant.abn"
  | "representative"
  | "representative.abn"
  | "representative.address"
  | "representative.contact"
  | "representative.profile"
  | "respondent"
  | "respondent.abn"
  | "respondent.address"
  | "respondent.contact"
  | "respondent.profile";

export type F2OmittedPaths = Extract<Path<F2FormData>, OmittedPathsUnion>;

export type Step1OmittedPaths = Extract<
  Path<Step1FieldData>,
  OmittedPathsUnion
>;
export type Step2OmittedPaths = Extract<
  Path<Step2FieldData>,
  OmittedPathsUnion
>;
export type Step3OmittedPaths = Extract<
  Path<Step2FieldData>,
  OmittedPathsUnion
>;
export type Step4OmittedPaths = Extract<
  Path<Step2FieldData>,
  OmittedPathsUnion
>;
export type Step5OmittedPaths = Extract<
  Path<Step2FieldData>,
  OmittedPathsUnion
>;
export type Step6OmittedPaths = Extract<
  Path<Step2FieldData>,
  OmittedPathsUnion
>;

export type F2FieldNames = Exclude<Path<F2FormData>, F2OmittedPaths>;
export type Step1FieldNames = Exclude<Path<Step1FieldData>, Step1OmittedPaths>;
export type Step2FieldNames = Exclude<Path<Step2FieldData>, Step2OmittedPaths>;
export type Step3FieldNames = Exclude<Path<Step3FieldData>, Step1OmittedPaths>;
export type Step4FieldNames = Exclude<Path<Step4FieldData>, Step2OmittedPaths>;
export type Step5FieldNames = Exclude<Path<Step5FieldData>, Step1OmittedPaths>;
export type Step6FieldNames = Exclude<Path<Step6FieldData>, Step2OmittedPaths>;

// export type FormMetaValue = F2FieldNames;
// export type Step1Fields = Exclude<Step1FieldData, F2FieldNames>;
// export type Step2Fields = Exclude<Step2FieldData, F2FieldNames>;

export type Step1FieldData = z.infer<typeof step1Schema>;
export type Step2FieldData = z.infer<typeof step2Schema>;
export type Step3FieldData = z.infer<typeof step3Schema>;
export type Step4FieldData = z.infer<typeof step4Schema>;
export type Step5FieldData = z.infer<typeof step5Schema>;
export type Step6FieldData = z.infer<typeof step6Schema>;
export type F2FormData = z.infer<typeof f2Schema>;
