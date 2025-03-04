"use client";

import { useAdditionalContext, F2FormData, f2Schema } from "#lib/forms/f2";
import { Box, Button, CardContent, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Step1 } from "./step-1";
import { Step2 } from "./step-2";
import { validateFormData } from "#lib/forms/shared/utils";
import { H1, H2, H3 } from "./typography";
import { Stepper } from "./form/stepper";

export const MultiStepForm = () => {
  const { progress, saveFormData, currentSchema } = useAdditionalContext();
  const { trigger, handleSubmit, getValues } = useFormContext<F2FormData>();

  const {
    activeStepIndex: stepIndex,
    activeStepState: stepState,
    setActiveStep,
    totalSteps,
    steps,
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
      setActiveStep(stepIndex, { error: "Please fix errors" });
    }
  };

  const handleBack = async () => {
    if (stepIndex > 0) {
      await validateAndSetStep(stepIndex - 1);
    }
  };

  const handleNext = async () => {
    if (stepIndex < totalSteps) {
      await validateAndSetStep(stepIndex + 1);
    }
  };

  const handleStep = (step: number) => async () => {
    await validateAndSetStep(step);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={0}>
        <Box mb={6} />
        <H1 hasOutline>Create lodgment</H1>
        <Box mb={3} />
        <H2>Unfair dismissal</H2>
        <Box mb={2} />
        <Stepper
          steps={steps}
          handleStep={handleStep}
          activeStepIndex={stepIndex}
          activeStepState={stepState}
          completed={[]}
        />
        <Box mb={2} />
        <H3 fontWeight={600} color="primary.main">
          {stepIndex + 1}. Overview
        </H3>
        <CardContent sx={{ paddingBottom: 2, maxWidth: "42rem" }}>
          <Typography>
            If your employer has dismissed you, and you believe it was unfair,
            you may be able to make a claim. Use Form F2.  Check you are ready
            before you apply.
          </Typography>
        </CardContent>
        <Box mb={2} />
        {stepIndex === 0 && <Step1 />}
        {stepIndex === 1 && <Step2 />}
        {stepIndex === 2 && <Step1 />}
        {stepIndex === 3 && <Step2 />}
        {stepIndex === 4 && <Step1 />}
        {stepIndex === 5 && <Step2 />}
        <Box>
          {stepIndex > 1 && (
            <Button onClick={handleBack} variant="contained" color="secondary">
              Back
            </Button>
          )}
          {stepIndex < 2 ? (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          )}
        </Box>
      </Stack>
    </form>
  );
};
