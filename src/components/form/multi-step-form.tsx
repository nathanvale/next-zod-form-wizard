"use client";

import { useAdditionalContext, F2FormData, f2Schema } from "#lib/forms/f2";
import { Box, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Step1 } from "./f2/step-1";
import { Step2 } from "./f2/step-2";
import { validateFormData } from "#lib/forms/shared/utils";
import { H1, H2 } from "../typography";
import { Stepper } from "./stepper";
import { FormActions } from "./actions";
import { FormToolbar } from "./toolbar";

export const MultiStepForm = () => {
  const {
    stepper,
    currentSchema,
    isSaving,
    // TODO: hook up isSubmitting where required
    // isSubmitting,
    setIsSaving,
    setIsSubmitting,
  } = useAdditionalContext();
  const {
    trigger,
    handleSubmit: handleRHFSubmit,
    getValues,
  } = useFormContext<F2FormData>();

  const {
    activeStepIndex,
    activeStepState,
    setActiveStep,
    totalSteps,
    stepsCompleted,
    totalStepsCompleted,
    isAllStepsCompleted,
    steps,
    handleReset,
  } = stepper;

  const submitFormData = async (data: F2FormData) => {
    try {
      const response = await fetch("/api/submit-form-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      console.log("Data submitted:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const saveFormData = async (data: F2FormData) => {
    try {
      const response = await fetch("/api/save-form-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save form data");
      }

      console.log("Data saved:", data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = async () => {
    const data = getValues();
    const validationResult = validateFormData(data, f2Schema);
    if (validationResult) {
      console.log("Final data:", validationResult);
      setIsSubmitting(true);
      await submitFormData(validationResult);
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    const data = getValues();
    setIsSaving(true);
    await saveFormData(data);
    setIsSaving(false);
  };

  const validateAndSetStep = async (newStepIndex: number) => {
    const data = getValues();
    validateFormData(data, currentSchema);
    const isValid = await trigger();
    if (isValid) {
      setActiveStep(newStepIndex);
    } else {
      setActiveStep(activeStepIndex, { error: "Please fix errors" });
    }
  };

  const handleBack = async () => {
    if (activeStepIndex > 0) {
      await validateAndSetStep(activeStepIndex - 1);
    }
  };

  const handleNext = async () => {
    if (activeStepIndex < totalSteps) {
      await validateAndSetStep(activeStepIndex + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleStep = (step: number) => async () => {
    await validateAndSetStep(step);
  };

  return (
    <form onSubmit={handleRHFSubmit(handleSubmit)}>
      <Stack gap={0}>
        <H1 hasOutline>Create lodgment</H1>
        <Box mb={3} />
        <H2>Unfair dismissal</H2>
        <Box mb={2} />
        <Stepper
          steps={steps}
          handleStep={handleStep}
          activeStepIndex={activeStepIndex}
          activeStepState={activeStepState}
          stepsCompleted={[]}
        />
        <Box mb={2} />
        <FormToolbar
          handleSave={handleSave}
          saveMessage="Not saved yet"
          isSaving={isSaving}
          saveHref="#"
          title={`${activeStepIndex + 1}. Overview`}
          description={`If your employer has dismissed you, and you believe it was unfair, you may be able to make a claim. Use Form F2.  Check you are ready before you apply.`}
        />
        <Box mb={2} />
        {activeStepIndex === 0 && <Step1 />}
        {activeStepIndex === 1 && <Step2 />}
        {activeStepIndex === 2 && <Step1 />}
        {activeStepIndex === 3 && <Step2 />}
        {activeStepIndex === 4 && <Step1 />}
        {activeStepIndex === 5 && <Step2 />}
        <Box mb={3} />
        <FormActions
          isAllStepsCompleted={isAllStepsCompleted}
          steps={steps}
          activeStepIndex={activeStepIndex}
          stepsCompleted={stepsCompleted}
          totalStepsCompleted={totalStepsCompleted}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleSubmit}
          handleReset={handleReset}
          // TODO: pass in a hanldleDelete function if the user has a draftId
          handleDelete={undefined}
          isSaving={isSaving}
        />
      </Stack>
    </form>
  );
};
