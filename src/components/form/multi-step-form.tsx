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
import { useURLSearchParams } from "#lib/forms/hooks/use-url-search-params";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname()
  const { searchParams,createQueryString } = useURLSearchParams();
  const draftFromId = searchParams.get("form-id") as string;

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
    console.log("submitFormData");
    try {
      const response = await fetch("/api/lodgments", {
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
    console.log("saveFormData");
    // Get form's id if exist
    try {
      if(!!draftFromId){
        const response = await fetch(`/api/forms/${draftFromId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }else{
        const response = await fetch("/api/forms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log('>>>',response)
        const url = `${pathname}?${createQueryString('form-id', )}`
        // if (response.ok) window.location.replace = url
      }
      

      // if (!response.ok) {
      //   throw new Error("Failed to save form data");
      // }

      console.log("Data saved:", data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    const data = getValues();
    validateFormData(data, f2Schema);
    setIsSubmitting(true);
    await submitFormData(data);
    setIsSubmitting(false);
  };

  const handleSave = async () => {
    console.log("handleSave");
    const data = getValues();
    setIsSaving(true);
    await saveFormData(data);
    setIsSaving(false);
  };

  const validateAndSetStep = async (newStepIndex: number) => {
    console.log(
      "validateAndSetStep function for the requested index",
      newStepIndex
    );
    const data = getValues();
    console.log(`Validating step ${activeStepIndex}...`);
    validateFormData(data, currentSchema);
    const isValid = await trigger();
    if (isValid) {
      console.log(
        `Step ${activeStepIndex} is valid going to step ${newStepIndex}`
      );
      setActiveStep(newStepIndex);
    } else {
      console.log(`Step ${activeStepIndex} is invalid`);
      setActiveStep(activeStepIndex, { error: "Please fix errors" });
    }
  };

  const handleBack = async () => {
    console.log("activeStepIndex", activeStepIndex);
    if (activeStepIndex > 0) {
      await validateAndSetStep(activeStepIndex - 1);
    }
  };

  const handleNext = async () => {
    console.log("activeStepIndex", activeStepIndex);
    console.log("totalSteps", totalSteps);
    if (activeStepIndex < totalSteps - 1) {
      await validateAndSetStep(activeStepIndex + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleStep = (step: number) => async () => {
    console.log("handleStep", step);
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
        {activeStepIndex === 2 && <Step2 />}
        {activeStepIndex === 3 && <Step2 />}
        {activeStepIndex === 4 && <Step2 />}
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
