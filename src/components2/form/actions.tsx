import { UseStepperReturn } from "#lib/forms/hooks/use-stepper";
import { Box, Button, StackProps } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

export interface FormActionsProps
  extends Pick<
      UseStepperReturn,
      | "isAllStepsCompleted"
      | "steps"
      | "stepsCompleted"
      | "totalStepsCompleted"
      | "activeStepIndex"
    >,
    StackProps {
  handleNext: () => void;
  handleBack: () => void;
  handleComplete: () => void;
  handleReset: () => void;
  handleDelete?: () => void;
  isSaving: boolean;
  isSubmitting: boolean;
  deleteLabel?: string;
}

export const FormActions = ({
  isAllStepsCompleted,
  steps,
  activeStepIndex,
  stepsCompleted,
  totalStepsCompleted,
  handleNext,
  handleBack,
  handleComplete,
  handleReset,
  handleDelete,
  isSaving,
  isSubmitting,
  deleteLabel = "Delete",
  ...props
}: FormActionsProps) => {
  return (
    <Box
      sx={{ display: "flex" }}
      justifyContent="space-between"
      gap={1}
      {...props}
    >
      <Box>
        {handleDelete && (
          <Button
            onClick={handleDelete}
            disabled={isSaving || isSubmitting}
            startIcon={<DeleteOutline color="inherit" />}
          >
            {deleteLabel}
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex" }} gap={1}>
        {activeStepIndex !== 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBack}
            disabled={isSaving || isSubmitting}
          >
            Back
          </Button>
        )}
        {/* TODO - make this of type "submit" instead */}
        <Button
          variant={"contained"}
          disabled={isSaving || isSubmitting}
          loading={isSubmitting}
          onClick={handleNext}
        >
          {activeStepIndex === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};
