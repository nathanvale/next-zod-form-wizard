import { UseStepperReturn } from "#lib/forms/hooks/use-stepper";
import {
  Box,
  Step,
  StepButton,
  Typography,
  Stepper as MuiStepper,
} from "@mui/material";

export interface StepperProps
  extends Pick<
    UseStepperReturn,
    "steps" | "stepsCompleted" | "activeStepIndex" | "activeStepState"
  > {
  handleStep: (step: number) => () => void;
}

export const Stepper = ({
  steps,
  stepsCompleted,
  activeStepIndex: activeStep,
  activeStepState: { error: activeStepError },
  handleStep,
}: StepperProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <MuiStepper
        nonLinear
        activeStep={activeStep}
        alternativeLabel
        sx={{ width: "100%" }}
      >
        {steps.map((label, index) => {
          const stepButtonProps: {
            optional?: React.ReactNode;
            error?: string;
          } = {};
          if (index === activeStep && activeStepError) {
            stepButtonProps.optional = (
              <Typography variant="caption" color="error">
                {activeStepError}
              </Typography>
            );
            stepButtonProps.error = activeStepError;
          }
          return (
            <Step key={label} completed={stepsCompleted[index]}>
              <StepButton
                color="inherit"
                onClick={handleStep(index)}
                disableRipple
                data-auto-save
                icon={stepButtonProps.error ? null : null}
                {...stepButtonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </MuiStepper>
    </Box>
  );
};
