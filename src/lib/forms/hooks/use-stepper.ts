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

  const handleNext = () => {
    const newActiveStepIndex =
      isLastStep() && !isAllStepsCompleted
        ? steps.findIndex((_, i) => !(i in stepsCompleted))
        : activeStep.index + 1;
    _setActiveStep({ index: newActiveStepIndex, state: { error: undefined } });
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => ({
  //     index: prevActiveStep.index - 1,
  //     state: { error: false },
  //   }));
  // };

  // const handleStep = (step: number) => () => {
  //   _setActiveStep({ index: step, state: { error: false } });
  // };

  // const handleComplete = () => {
  //   setCompleted((prevCompleted) => ({
  //     ...prevCompleted,
  //     [activeStep.index]: true,
  //   }));
  //   handleNext();
  // };

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
    // handleNext,
    // handleBack,
    // handleStep,
    // handleComplete,
    handleReset,
    isAllStepsCompleted,
    totalStepsCompleted,
    totalSteps,
    setErrorState,
    activeStepIndex: activeStep.index,
    activeStepState: activeStep.state,
  };
};
