"use client";

import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  schema,
} from "#lib/forms/f2";
import { MultiStepForm } from "./form/multi-step-form";
import { FormProvider, FormData, StepSchema, StepMeta } from "./form/provider";

const data: FormData[] = (
  [
    {
      schema: step1Schema,
      title: "Overview",
      index: 0,
    },
    {
      schema: step2Schema,
      title: "Applicant",
      index: 1,
    },
    {
      schema: step3Schema,
      title: "Employer",
      index: 2,
    },
    {
      schema: step4Schema,
      title: "Timeline",
      index: 3,
    },
    {
      schema: step5Schema,
      title: "Dismissal",
      index: 4,
    },
    {
      schema: step6Schema,
      title: "Review",
      index: 5,
    },
  ] as (StepSchema & StepMeta)[]
).map((data) => ({
  ...data,
  isCurrent: data.index === 0,
  isCompleted: false,
  isDirty: false,
  isValid: false,
}));

const state = data.map(
  ({ isCurrent, isCompleted, isDirty, isValid, error }) => ({
    isCurrent,
    isCompleted,
    isDirty,
    isValid,
    error,
  })
);
const schemas = data.map(({ schema }) => ({ schema }));

const metaData = data.map(({ title, index, description }) => ({
  title,
  index,
  description,
}));

export interface AppProps {
  children: React.ReactNode;
}

export const App = () => {
  return (
    <FormProvider
      state={state}
      schemas={schemas}
      schema={schema}
      metaData={metaData}
    >
      <MultiStepForm />
    </FormProvider>
  );
};
