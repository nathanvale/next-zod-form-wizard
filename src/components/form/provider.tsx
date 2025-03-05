import {
  step1Schema,
  step2Schema,
  F2FormData,
  defaultValues,
  AdditionalContext,
} from "#lib/forms/f2";
import { useStepper } from "#lib/forms/hooks/use-stepper";
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

export interface StepsData extends StepMeta, StepState, StepSchema {}

export interface F2ProviderProps {
  children: ReactNode;
  stepsState: StepState[];
  stepsSchema: StepSchema[];
  stepsMeta: StepMeta[];
}

export const FormProvider = ({
  children,
  stepsState,
  stepsSchema,
  stepsMeta,
}: F2ProviderProps) => {
  const steps = stepsMeta.map(({ title }) => title);
  const stepper = useStepper({ steps, currentStep: 0 });
  const schemas = stepsSchema.map(({ schema }) => schema);
  const currentSchema = schemas[stepper.activeStep.index];
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<F2FormData>({
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
