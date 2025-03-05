"use client";

import { useAdditionalContext, F2FormData, f2Schema } from "#lib/forms/f2";
import { Box, Button, CardContent, Stack, Typography } from "@mui/material";
import { Form, useFormContext } from "react-hook-form";
import { Step1 } from "../step-1";
import { Step2 } from "../step-2";
import { validateFormData } from "#lib/forms/shared/utils";
import { H1, H2, H3 } from "../typography";
import { Stepper } from "./stepper";
import { FormActions } from "./actions";
import { FormToolbar } from "./toolbar";

export const MultiStepForm = () => {
  const { progress, saveFormData, currentSchema } = useAdditionalContext();
  const { trigger, handleSubmit, getValues } = useFormContext<F2FormData>();

  const {
    activeStepIndex,
    activeStepState,
    setActiveStep,
    totalSteps,
    steps,
    stepsCompleted,
    totalStepsCompleted,
    isAllStepsCompleted,
  } = progress;

  const onSubmit = async () => {
    const data = getValues();
    const validationResult = validateFormData(data, f2Schema);
    if (validationResult) {
      console.log("Final data:", validationResult);
      // Make API call to save form data
      await saveFormData(validationResult);
    }
  };

  const validateAndSetStep = async (newStepIndex: number) => {
    const data = getValues();
    validateFormData(data, currentSchema);
    const isValid = await trigger();
    console.log("isValid", isValid);
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

  const handleNext = async (C) => {
    if (activeStepIndex < totalSteps) {
      await validateAndSetStep(activeStepIndex + 1);
    }
  };

  const handleStep = (step: number) => async () => {
    await validateAndSetStep(step);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          // TODO: pass in a handleSave async
          handleSave={() => Promise.resolve()}
          saveMessage="Not saved yet"
          // TODO: pass in a isSaving flag if the form is currently saving
          isSaving={false}
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
          handleComplete={onSubmit}
          handleReset={progress.handleReset}
          // TODO: pass in a hanldleDelete function if the user has a draftId
          handleDelete={undefined}
          // TODO: pass in a isSaving flag if the form is currently saving
          isSaving={false}
        />
      </Stack>
    </form>
  );
};
