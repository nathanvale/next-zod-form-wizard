"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { F2FormData } from "./types";
import { step1Schema, step2Schema } from "./schema";
import { defaultValues } from "./default-values";
import { z } from "zod";

type AdditionalState = {
  currentStep: number;
  currentSchema: z.ZodObject<any, any>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  saveFormData: (data: F2FormData) => Promise<void>;
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
const stepSchemas = [step1Schema, step2Schema];

export const F2Provider: React.FC<{ children: ReactNode }> = ({
  children,
}: F2ProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const currentSchema = stepSchemas[currentStep - 1];

  const methods = useForm<F2FormData>({
    resolver: zodResolver(currentSchema as any),
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
      value={{ currentStep, setCurrentStep, saveFormData, currentSchema }}
    >
      <RHFFormProvider {...methods}>{children}</RHFFormProvider>
    </AdditionalContext.Provider>
  );
};
