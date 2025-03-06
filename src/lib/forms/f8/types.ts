import { Step1 } from "../../../components2/form/f2/step-1";
import { z } from "zod";
import {
  step1Schema,
  step2Schema,
  schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
} from "./schema";
import { Path } from "react-hook-form";

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

export type F2OmittedPaths = Extract<Path<F2FieldValues>, OmittedPathsUnion>;

export type Step1OmittedPaths = Extract<
  Path<Step1FieldValues>,
  OmittedPathsUnion
>;
export type Step2OmittedPaths = Extract<
  Path<Step2FieldValues>,
  OmittedPathsUnion
>;
export type Step3OmittedPaths = Extract<
  Path<Step2FieldValues>,
  OmittedPathsUnion
>;
export type Step4OmittedPaths = Extract<
  Path<Step2FieldValues>,
  OmittedPathsUnion
>;
export type Step5OmittedPaths = Extract<
  Path<Step2FieldValues>,
  OmittedPathsUnion
>;
export type Step6OmittedPaths = Extract<
  Path<Step2FieldValues>,
  OmittedPathsUnion
>;

export type F2FieldNames = Exclude<Path<F2FieldValues>, F2OmittedPaths>;
export type Step1FieldNames = Exclude<
  Path<Step1FieldValues>,
  Step1OmittedPaths
>;
export type Step2FieldNames = Exclude<
  Path<Step2FieldValues>,
  Step2OmittedPaths
>;
export type Step3FieldNames = Exclude<
  Path<Step3FieldValues>,
  Step1OmittedPaths
>;
export type Step4FieldNames = Exclude<
  Path<Step4FieldValues>,
  Step2OmittedPaths
>;
export type Step5FieldNames = Exclude<
  Path<Step5FieldValues>,
  Step1OmittedPaths
>;
export type Step6FieldNames = Exclude<
  Path<Step6FieldValues>,
  Step2OmittedPaths
>;

export type Step1FieldValues = z.infer<typeof step1Schema>;
export type Step2FieldValues = z.infer<typeof step2Schema>;
export type Step3FieldValues = z.infer<typeof step3Schema>;
export type Step4FieldValues = z.infer<typeof step4Schema>;
export type Step5FieldValues = z.infer<typeof step5Schema>;
export type Step6FieldValues = z.infer<typeof step6Schema>;
export type F2FieldValues = z.infer<typeof schema>;
