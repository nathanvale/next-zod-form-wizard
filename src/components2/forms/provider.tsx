import { useStepper } from "#lib/forms/hooks";
import { AdditionalContext } from "#lib/forms/shared/context";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import {
  useForm,
  FormProvider as RHFFormProvider,
  DefaultValues,
  FieldValues,
} from "react-hook-form";
import { z } from "zod";

export interface StepSchema {
  schema: z.ZodSchema;
}

//TODO: extend from the typescript library
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
  // The schemas for each step
  schemas: StepSchema[];
  // The metadata for each field (Label, Placeholder, etc.)
  metaData: StepMeta[];
  // The default values for the form
  defaultValues: DefaultValues<FieldValues>;
  // The last time the form was saved as a unix timestamp
  lastSaved?: number;
}

export const FormProvider = ({
  children,
  schemas: stepsSchema,
  schema: formSchema,
  metaData: stepsMeta,
  defaultValues,
}: F2ProviderProps) => {
  const steps = stepsMeta.map(({ title }) => title);
  const stepper = useStepper({ steps, currentStep: 0 });
  const schemas = stepsSchema.map(({ schema }) => schema);
  const currentStepSchema = schemas[stepper.activeStep.index];
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved] = useState<number | undefined>(undefined);

  const methods = useForm({
    resolver: zodResolver(currentStepSchema),
    defaultValues,
  });

  return (
    <AdditionalContext.Provider
      value={{
        stepper,
        currentStepSchema,
        isSaving,
        isSubmitting,
        setIsSaving,
        setIsSubmitting,
        formSchema,
        lastSaved,
      }}
    >
      <RHFFormProvider {...methods}>{children}</RHFFormProvider>
    </AdditionalContext.Provider>
  );
};
