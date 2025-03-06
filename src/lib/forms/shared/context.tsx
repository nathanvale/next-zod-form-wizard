"use client";

import { createContext, useContext } from "react";
import { z } from "zod";
import { useStepper } from "../hooks";

export interface AdditionalState {
  currentStepSchema: z.ZodSchema;
  stepper: ReturnType<typeof useStepper>;
  isSaving: boolean;
  isSubmitting: boolean;
  setIsSaving: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void;
  formSchema: z.ZodSchema;
  lastSaved?: string;
}

export const AdditionalContext = createContext<AdditionalState | undefined>(
  undefined
);

export const useAdditionalContext = () => {
  const context = useContext(AdditionalContext);
  if (!context) {
    throw new Error(
      "useAdditionalContext must be used within a CustomFormProvider"
    );
  }
  return context;
};
