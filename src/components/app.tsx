"use client";

import { step1Schema, step2Schema } from "#lib/forms/f2/schema";
import { MultiStepForm } from "./form/multi-step-form";
import { FormProvider, StepsData } from "./form/provider";

const stepsData: StepsData[] = [
  {
    schema: step1Schema,
    title: "Overview",
    index: 0,
    isCurrent: true,
    isCompleted: false,
    isDirty: false,
    isValid: false,
  },
  {
    schema: step2Schema,
    title: "Applicant",
    index: 1,
    isCurrent: false,
    isCompleted: false,
    isDirty: false,
    isValid: false,
  },
  {
    schema: step2Schema,
    title: "Employer",
    index: 2,
    isCurrent: false,
    isCompleted: false,
    isDirty: false,
    isValid: false,
  },
  {
    schema: step2Schema,
    title: "Timeline",
    index: 3,
    isCurrent: false,
    isCompleted: false,
    isDirty: false,
    isValid: false,
  },
  {
    schema: step2Schema,
    title: "Dismissal",
    index: 4,
    isCurrent: false,
    isCompleted: false,
    isDirty: false,
    isValid: false,
  },
  {
    schema: step2Schema,
    title: "Review",
    index: 5,
    isCurrent: false,
    isCompleted: false,
    isDirty: false,
    isValid: false,
  },
];

const stepsState = stepsData.map(
  ({ isCurrent, isCompleted, isDirty, isValid, error }) => ({
    isCurrent,
    isCompleted,
    isDirty,
    isValid,
    error,
  })
);
const stepsSchema = stepsData.map(({ schema }) => ({ schema }));

const stepsMeta = stepsData.map(({ title, index, description }) => ({
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
      stepsState={stepsState}
      stepsSchema={stepsSchema}
      stepsMeta={stepsMeta}
    >
      <MultiStepForm />
    </FormProvider>
  );
};
