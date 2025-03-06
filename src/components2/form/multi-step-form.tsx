"use client";

import { F2FieldValues } from "#lib/forms/f2";
import { Box, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { validateSchemaWithValues } from "#lib/forms/utils";
import { H1, H2 } from "../typography";
import { Stepper } from "./stepper";
import { FormActions } from "./actions";
import { FormToolbar } from "./toolbar";
import { useURLSearchParams } from "#lib/hooks/use-url-search-params";
import { usePathname, useRouter } from "next/navigation";
import { Step1, Step2, Step3, Step4, Step5, Step6 } from "./f2";
import { useAdditionalContext } from "#lib/forms/shared/context";

export const MultiStepForm = () => {
  const {
    stepper,
    isSaving,
    isSubmitting,
    setIsSaving,
    setIsSubmitting,
    formSchema,
  } = useAdditionalContext();
  const pathname = usePathname();
  const { searchParams, createQueryString } = useURLSearchParams();
  const draftFromId = searchParams.get("form-id") as string;
  const router = useRouter();

  const {
    trigger,
    handleSubmit: handleRHFSubmit,
    getValues,
  } = useFormContext<F2FieldValues>();

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

  const submitFormData = async (data: F2FieldValues) => {
    try {
      const response = await fetch("/api/lodgments-mock", {
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

  const saveFormData = async (data: F2FieldValues) => {
    try {
      if (!!draftFromId) {
        // Update existing saved draft form
        const response = await fetch(`/api/forms-mock/${draftFromId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();

        const { modifiedOn } = responseData;
        console.log("update call:", modifiedOn);
      } else {
        // Create a new draft form
        const response = await fetch("/api/forms-mock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        const { formId, modifiedOn } = responseData;
        if (formId) {
          const url = `${pathname}?${createQueryString(
            "form-id",
            `${formId}`
          )}`;
          router.push(url);
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const validateAndSetStep = async (newStepIndex: number) => {
    const isValid = await trigger();
    const data = getValues();
    validateSchemaWithValues(data, formSchema);
    if (isValid) {
      setActiveStep(newStepIndex);
    } else {
      setActiveStep(activeStepIndex, { error: "Please fix errors" });
    }
  };
  const handleSubmit = async () => {
    const isValid = await trigger();
    const data = getValues();
    validateSchemaWithValues(data, formSchema);
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    await submitFormData(data);
    setIsSubmitting(false);
  };

  const handleSave = async () => {
    const data = getValues();
    setIsSaving(true);
    await saveFormData(data);
    setIsSaving(false);
  };

  const handleBack = async () => {
    if (activeStepIndex > 0) {
      await validateAndSetStep(activeStepIndex - 1);
    }
  };

  const handleNext = async () => {
    if (activeStepIndex < totalSteps - 1) {
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
          savedMessage="Not saved yet"
          isSaving={isSaving}
          saveHref="#"
          isSubmitting={isSubmitting}
          title={`${activeStepIndex + 1}. Overview`}
          description={`If your employer has dismissed you, and you believe it was unfair, you may be able to make a claim. Use Form F2.  Check you are ready before you apply.`}
        />
        <Box mb={2} />
        {activeStepIndex === 0 && <Step1 />}
        {activeStepIndex === 1 && <Step2 />}
        {activeStepIndex === 2 && <Step3 />}
        {activeStepIndex === 3 && <Step4 />}
        {activeStepIndex === 4 && <Step5 />}
        {activeStepIndex === 5 && <Step6 />}
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
          isSubmitting={isSubmitting}
          isSaving={isSaving}
        />
      </Stack>
    </form>
  );
};
