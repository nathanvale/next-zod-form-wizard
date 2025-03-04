"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { F2FormData } from "./types";
import { step1Schema, step2Schema } from "./schema";
import { defaultValues } from "./default-values";
import { z } from "zod";
import { useStepper } from "../hooks/use-stepper";

type AdditionalState = {
  currentSchema: z.ZodSchema;
  saveFormData: (data: F2FormData) => Promise<void>;
  progress: ReturnType<typeof useStepper>;
};

const AdditionalContext = createContext<AdditionalState | undefined>(undefined);

export const useAdditionalContext = () => {
  const context = useContext(AdditionalContext);
  if (!context) {
    throw new Error(
      "useAdditionalContext must be used within a CustomFormProvider"
    );
  }
  return context;
};

export interface F2ProviderProps {
  children: ReactNode;
}
const stepSchemas: z.ZodSchema[] = [
  step1Schema,
  step2Schema,
  step1Schema,
  step2Schema,
  step1Schema,
  step2Schema,
];
const steps = [
  "Overview",
  "Applicant",
  "Employer",
  "Timeline",
  "Dismissal",
  "Review",
];

export const F2Provider: React.FC<{ children: ReactNode }> = ({
  children,
}: F2ProviderProps) => {
  const progress = useStepper({ steps, currentStep: 0 });
  const currentSchema = stepSchemas[progress.activeStep.index];

  const methods = useForm<F2FormData>({
    resolver: zodResolver(currentSchema),
    defaultValues,
  });

  const saveFormData = async (data: F2FormData) => {
    // Simulate an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Data saved:", data);
        resolve();
      }, 1000);
    });
  };

  return (
    <AdditionalContext.Provider
      value={{ progress, saveFormData, currentSchema }}
    >
      <RHFFormProvider {...methods}>{children}</RHFFormProvider>
    </AdditionalContext.Provider>
  );
};
