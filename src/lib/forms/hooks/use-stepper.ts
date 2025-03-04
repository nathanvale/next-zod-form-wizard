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
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );

  const totalSteps = steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep.index === totalSteps - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps;

  const handleNext = () => {
    const newActiveStepIndex =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
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
    setCompleted({});
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
    completed,
    // handleNext,
    // handleBack,
    // handleStep,
    // handleComplete,
    handleReset,
    allStepsCompleted,
    completedSteps,
    totalSteps,
    setErrorState,
    activeStepIndex: activeStep.index,
    activeStepState: activeStep.state,
  };
};
