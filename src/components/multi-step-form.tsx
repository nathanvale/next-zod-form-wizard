"use client";

import { useAdditionalContext, F2FormData, f2Schema } from "#lib/forms/f2";
import { Button, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Step1 } from "./step-1";
import { Step2 } from "./step-2";
import { z } from "zod";
import { validateFormData } from "#lib/forms/shared/utils";

export const MultiStepForm = () => {
  const { currentStep, setCurrentStep, saveFormData, currentSchema } =
    useAdditionalContext();
  const { trigger, handleSubmit, getValues } = useFormContext<F2FormData>();

  const onSubmit = async () => {
    const data = getValues();
    const validationResult = validateFormData(data, f2Schema);
    if (validationResult) {
      console.log("Final data:", validationResult);
      // Make API call to save form data
      await saveFormData(validationResult);
    }
  };

  const handleBack = async () => {
    const data = getValues();
    validateFormData(data, currentSchema);
    const isValid = await trigger();
    console.log("isValid", isValid);
    if (isValid && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    const data = getValues();
    validateFormData(data, currentSchema);
    const isValid = await trigger();
    console.log("isValid", isValid);
    if (isValid && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2">The current step is {currentStep}</Typography>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      <div>
        {currentStep > 1 && (
          <Button onClick={handleBack} variant="contained" color="secondary">
            Back
          </Button>
        )}
        {currentStep < 2 ? (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};
