import { F2FieldData, defaultValues } from "#lib/forms/f2";
import { useStepper } from "#lib/forms/hooks";
import { AdditionalContext } from "#lib/forms/shared/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { z } from "zod";

export interface StepSchema {
  schema: z.ZodSchema;
}
export interface StepMeta {
  title: string;
  description?: ReactNode;
  index: number;
}

export interface StepState {
  isCurrent: boolean;
  isCompleted: boolean;
  isDirty: boolean;
  isValid: boolean;
  error?: string;
}

export interface FormData extends StepMeta, StepState, StepSchema {}

export interface F2ProviderProps {
  // The form steps
  children: ReactNode;
  // The state of each step
  state: StepState[];
  // The schema for the entire form
  schema: z.ZodSchema;
  // The schema for each step
  schemas: StepSchema[];
  // The metadata for each step (Label, Placeholder, etc.)
  metaData: StepMeta[];
}

export const FormProvider = ({
  children,
  schemas: stepsSchema,
  metaData: stepsMeta,
}: F2ProviderProps) => {
  const steps = stepsMeta.map(({ title }) => title);
  const stepper = useStepper({ steps, currentStep: 0 });
  const schemas = stepsSchema.map(({ schema }) => schema);
  const currentSchema = schemas[stepper.activeStep.index];
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<F2FieldData>({
    resolver: zodResolver(currentSchema),
    defaultValues,
  });

  return (
    <AdditionalContext.Provider
      value={{
        stepper,
        currentSchema,
        isSaving,
        isSubmitting,
        setIsSaving,
        setIsSubmitting,
      }}
    >
      <RHFFormProvider {...methods}>{children}</RHFFormProvider>
    </AdditionalContext.Provider>
  );
};
