import { Box, Stack } from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { Stepper } from "./stepper";
import { FormActions } from "./actions";
import { FormToolbar } from "./toolbar";
import { H1, H2 } from "#components/typography";
import { useAdditionalContext } from "#lib/forms/shared/context";

interface FormProps<T> {
  onSubmit: (data: T) => Promise<void>;
  onSave: (data: T) => Promise<void>;
  title: string;
  description: string;
  subtitle: string;
  children: React.ReactNode[];
}

export const Form = <T extends FieldValues>({
  onSubmit,
  onSave,
  title,
  subtitle,
  children,
}: FormProps<T>) => {
  const { stepper, isSaving, isSubmitting } = useAdditionalContext();
  const {
    trigger,
    handleSubmit: handleRHFSubmit,
    getValues,
  } = useFormContext<T>();

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
    if (isValid) {
      setActiveStep(newStepIndex);
    } else {
      setActiveStep(activeStepIndex, { error: "Please fix errors" });
    }
  };

  const handleSubmit = async () => {
    const data = getValues();
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    await onSubmit(data);
  };

  const handleSave = async () => {
    const data = getValues();
    await onSave(data);
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
        <H1 hasOutline>{title}</H1>
        <Box mb={3} />
        <H2>{subtitle}</H2>
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
          isSubmitting={isSubmitting}
          title={title}
          description={`If your employer has dismissed you, and you believe it was unfair, you may be able to make a claim. Use Form F2.  Check you are ready before you apply.`}
        />
        <Box mb={2} />
        {children[activeStepIndex]}
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
