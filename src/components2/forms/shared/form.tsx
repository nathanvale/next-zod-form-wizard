import {
  Box,
  Stack,
  StepProps,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { Stepper } from "../stepper";
import { FormActions } from "../actions";
import { FormToolbar } from "../toolbar";
import { H1, H2 } from "../../typography";
import { useAdditionalContext } from "#lib/forms/shared/context";
import { validateSchemaWithValues } from "#lib/forms/utils";
import { FieldValuesTypes } from "#lib/forms/shared/types";
import {
  Children,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  use,
  useEffect,
  useState,
} from "react";

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
  const [queuedStep, setQueuedStep] = useState<number | undefined>();

  useEffect(() => {
    setQueuedStep(undefined);
  }, [activeStepIndex]);

  const handleCloseModal = () => setOpenModal(false);
  const handleContinue = () => {
    setOpenModal(false);
    if (queuedStep !== undefined) {
      setActiveStep(queuedStep);
    }
  };

  const validateAndGotoStep = async (targetStepIndex: number) => {
    const isValid = await trigger();
    const data = getValues();
    validateSchemaWithValues(data, formSchema);
    if (isValid) {
      setActiveStep(targetStepIndex);
    } else {
      setQueuedStep(targetStepIndex);
      setOpenModal(true);
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
            savedMessage="Not saved yet"
            isSaving={isSaving}
            saveHref="#"
            isSubmitting={isSubmitting}
            title={title}
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
            handleComplete={handleInternalSubmit}
            handleReset={handleReset}
            // TODO: pass in a hanldleDelete function if the user has a draftId
            handleDelete={undefined}
            isSubmitting={isSubmitting}
            isSaving={isSaving}
          />
        </Stack>
      </form>
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
