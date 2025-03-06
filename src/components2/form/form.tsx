import { Box, Stack } from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { Stepper } from "./stepper";
import { FormActions } from "./actions";
import { FormToolbar } from "./toolbar";
import { H1, H2 } from "../typography";
import { useAdditionalContext } from "#lib/forms/shared/context";
import { validateSchemaWithValues } from "#lib/forms/utils";
import { FieldValuesTypes } from "#lib/forms/shared/types";

export interface FormProps {
  handleSubmit: (data: FieldValuesTypes) => Promise<void>;
  handleSave: (data: FieldValuesTypes) => Promise<void>;
  title: string;
  description: string;
  subtitle: string;
  children: React.ReactNode;
}

export const Form = ({
  handleSubmit,
  handleSave,
  title,
  subtitle,
  children,
}: FormProps) => {
  const {
    stepper,
    isSaving,
    isSubmitting,
    setIsSaving,
    setIsSubmitting,
    formSchema,
    lastSaved,
  } = useAdditionalContext();
  const {
    trigger,
    handleSubmit: handleRHFSubmit,
    getValues,
  } = useFormContext<FieldValuesTypes>();

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

  const handleInternalSubmit = async () => {
    const isValid = await trigger();
    const data = getValues();
    validateSchemaWithValues(data, formSchema);
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    await handleSubmit(data);
    setIsSubmitting(false);
  };

  const handleInteralSave = async () => {
    const data = getValues();
    setIsSaving(true);
    await handleSave(data);
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
      await handleInternalSubmit();
    }
  };

  const handleStep = (step: number) => async () => {
    await validateAndSetStep(step);
  };

  return (
    <form onSubmit={handleRHFSubmit(handleInternalSubmit)}>
      <Stack gap={0}>
        <H1 hasOutline>{title}</H1>
        <Box mb={3} />
        <H2>{subtitle}</H2>
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
          handleSave={handleInteralSave}
          savedMessage="Not saved yet"
          isSaving={isSaving}
          saveHref="#"
          isSubmitting={isSubmitting}
          title={title}
          description={`If your employer has dismissed you, and you believe it was unfair, you may be able to make a claim. Use Form F2.  Check you are ready before you apply.`}
        />
        <Box mb={2} />
        {children}
        <Box mb={3} />
        <FormActions
          isAllStepsCompleted={isAllStepsCompleted}
          steps={steps}
          activeStepIndex={activeStepIndex}
          stepsCompleted={stepsCompleted}
          totalStepsCompleted={totalStepsCompleted}
          handleNext={handleNext}
          handleBack={handleBack}
          handleComplete={handleInternalSubmit}
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
