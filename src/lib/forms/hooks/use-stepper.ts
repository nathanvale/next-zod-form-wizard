import React from "react";

interface StepState {
  error?: string;
}
interface ActiveStep {
  index: number;
  state: StepState;
}

interface useStepperProps {
  steps: string[];
  currentStep: number;
}

export type UseStepperReturn = ReturnType<typeof useStepper>;

export const useStepper = ({ steps, currentStep = 0 }: useStepperProps) => {
  const [activeStep, _setActiveStep] = React.useState<ActiveStep>({
    index: currentStep,
    state: { error: undefined },
  });

  const [stepsCompleted, setStepsCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = steps.length;
  const totalStepsCompleted = Object.keys(stepsCompleted).length;
  const isLastStep = () => activeStep.index === totalSteps - 1;
  const isAllStepsCompleted = Object.keys(stepsCompleted).length === totalSteps;

  const handleReset = () => {
    _setActiveStep({ index: 0, state: { error: undefined } });
    setStepsCompleted({});
  };

  const setErrorState = (isError: boolean) => {
    _setActiveStep((prevActiveStep) => ({
      ...prevActiveStep,
      isError,
    }));
  };

  const setActiveStep = (
    index: number,
    state: StepState = { error: undefined }
  ) => {
    _setActiveStep({
      index,
      state,
    });
  };

  return {
    steps,
    activeStep,
    setActiveStep,
    stepsCompleted,
    handleReset,
    isAllStepsCompleted,
    totalStepsCompleted,
    totalSteps,
    setErrorState,
    isLastStep,
    activeStepIndex: activeStep.index,
    activeStepState: activeStep.state,
  };
};
