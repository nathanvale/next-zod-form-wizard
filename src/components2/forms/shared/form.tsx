import { Box, Stack, Modal, Typography, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Stepper } from "../stepper";
import { FormActions } from "../actions";
import { FormToolbar } from "../toolbar";
import { H1, H2 } from "../../core/typography";
import { useAdditionalContext } from "#lib/forms/shared/context";
import { consoleLogAnySchemaErrors } from "#lib/forms/utils";
import { FieldValuesTypes } from "#lib/forms/shared/types";
import { Children, ReactElement, useEffect, useState } from "react";
import { useLastSaved } from "#lib/forms/hooks";

export interface FormProps {
  handleSubmit: (data: FieldValuesTypes) => Promise<void>;
  handleSave: (data: FieldValuesTypes) => Promise<void>;
  title: string;
  description: string;
  subtitle: string;
  children: ReactElement | ReactElement[];
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

  const [openModal, setOpenModal] = useState(false);
  const [handleContinue, setHandleContinue] = useState<() => void>(
    () => () => {}
  );
  const { message: savedMessage } = useLastSaved(lastSaved);

  useEffect(() => {
    setHandleContinue(() => () => {});
  }, [activeStepIndex]);

  const handleCloseModal = () => setOpenModal(false);

  const validate = async () => {
    const isValid = await trigger();
    const data = getValues();
    consoleLogAnySchemaErrors(data, formSchema);
    return isValid;
  };

  const validateAndGotoStep = async (targetStepIndex: number) => {
    const isValid = await validate();
    if (isValid) {
      setActiveStep(targetStepIndex);
    } else {
      setHandleContinue(() => () => {
        setOpenModal(false);
        setActiveStep(targetStepIndex);
      });
      setOpenModal(true);
    }
  };

  const handleBack = async () => {
    if (activeStepIndex > 0) {
      await validateAndGotoStep(activeStepIndex - 1);
    }
  };

  const handleNext = async () => {
    if (activeStepIndex < totalSteps - 1) {
      await validateAndGotoStep(activeStepIndex + 1);
    } else {
      await handleInternalSubmit();
    }
  };

  const handleStep = (step: number) => async () => {
    await validateAndGotoStep(step);
  };

  const submit = async () => {
    const data = getValues();
    setIsSubmitting(true);
    await handleSubmit(data);
    setIsSubmitting(false);
  };

  const handleSaveAndExit = async () => {
    await handleInteralSave();
    //TODO: Redirect to the dashboard page
    console.log("Save and Exit");
  };

  const handleInternalSubmit = async () => {
    const isValid = await validate();
    if (!isValid) {
      setHandleContinue(() => async () => {
        setOpenModal(false);
        await submit();
      });
      setOpenModal(true);
      return;
    }
    await submit();
  };

  const handleInteralSave = async () => {
    const data = getValues();
    setIsSaving(true);
    await handleSave(data);
    setIsSaving(false);
  };
  const childrenArray = Children.toArray(children);

  return (
    <>
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
            handleSaveAndExit={handleSaveAndExit}
            savedMessage={savedMessage}
            isSaving={isSaving}
            saveHref="#"
            isSubmitting={isSubmitting}
            title={`${activeStepIndex + 1}. ${steps[activeStepIndex]}`}
            // TODO: This is actually tied to a step so need to get it from step.description
            description={`If your employer has dismissed you, and you believe it was unfair, you may be able to make a claim. Use Form F2.  Check you are ready before you apply.`}
          />
          <Box mb={2} />
          {childrenArray[activeStepIndex]}
          <Box mb={3} />
          <FormActions
            isAllStepsCompleted={isAllStepsCompleted}
            steps={steps}
            activeStepIndex={activeStepIndex}
            stepsCompleted={stepsCompleted}
            totalStepsCompleted={totalStepsCompleted}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSubmit={handleInternalSubmit}
            handleReset={handleReset}
            // TODO: pass in a hanldleDelete function if the user has a draftId
            handleDelete={undefined}
            isSubmitting={isSubmitting}
            isSaving={isSaving}
          />
        </Stack>
      </form>
      {/* TODO: Uplift this to a Dialog component */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="validation-error-modal"
        aria-describedby="validation-error-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="validation-error-modal" variant="h6" component="h2">
            Validation Errors
          </Typography>
          <Typography id="validation-error-description" sx={{ mt: 2 }}>
            There are validation errors in the form. Do you want to fix them or
            continue to the next step?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              Fix Errors
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
