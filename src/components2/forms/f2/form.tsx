import { Form } from "../shared/form";
import { Step1 } from "./step-1";
import { Step2 } from "./step-2";
import { Step3 } from "./step-3";
import { Step4 } from "./step-4";
import { Step5 } from "./step-5";
import { Step6 } from "./step-6";
import { FormProvider, FormData, StepSchema, StepMeta } from "../provider";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  schema,
  F2FieldValues,
  defaultValues,
} from "#lib/forms/f2";
import { useDraftFormId } from "#lib/forms/hooks";
import { useEffect, useState } from "react";
import axios from "axios";

const data: FormData[] = (
  [
    {
      schema: step1Schema,
      title: "Overview",
      index: 0,
    },
    {
      schema: step2Schema,
      title: "Applicant",
      index: 1,
    },
    {
      schema: step3Schema,
      title: "Employer",
      index: 2,
    },
    {
      schema: step4Schema,
      title: "Timeline",
      index: 3,
    },
    {
      schema: step5Schema,
      title: "Dismissal",
      index: 4,
    },
    {
      schema: step6Schema,
      title: "Review",
      index: 5,
    },
  ] as (StepSchema & StepMeta)[]
).map((data) => ({
  ...data,
  isCurrent: data.index === 0,
  isCompleted: false,
  isDirty: false,
  isValid: false,
}));

const state = data.map(
  ({ isCurrent, isCompleted, isDirty, isValid, error }) => ({
    isCurrent,
    isCompleted,
    isDirty,
    isValid,
    error,
  })
);
const schemas = data.map(({ schema }) => ({ schema }));

const metaData = data.map(({ title, index, description }) => ({
  title,
  index,
  description,
}));

export const F2Form = () => {
  const { draftFormId, setDraftFormId } = useDraftFormId();
  const [lastSaved, setLastSaved] = useState<number | undefined>();
  console.log("draftFormId:", draftFormId);
  const handleSave = async (data: F2FieldValues) => {
    try {
      if (!draftFormId) {
        // Save a new draft form
        const response = await axios.post("/api/forms-mock", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { formId, modifiedOn } = response.data.data;
        setLastSaved(modifiedOn);
        setDraftFormId(formId);
      } else {
        // Update an existing saved draft form
        const response = await axios.post(
          `/api/forms-mock/${draftFormId}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { modifiedOn } = response.data.data;
        setLastSaved(modifiedOn);
      }
    } catch (error) {
      //TODO: Let the user know that the save or update form failed
    }
  };
  const handleSubmit = async (data: F2FieldValues) => {
    try {
      const response = await axios.post("/api/lodgments-mock", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      //TODO: Let the user know that the submission failed
    }
  };
  return (
    <FormProvider
      state={state}
      schemas={schemas}
      schema={schema}
      metaData={metaData}
      defaultValues={defaultValues}
      lastSaved={lastSaved}
    >
      <Form
        title="Create lodgment"
        subtitle="Unfair dismissal"
        description="If your employer has dismissed you, and you believe it was unfair, you may be able to make a claim. Use Form F2.  Check you are ready before you apply."
        handleSave={handleSave}
        handleSubmit={handleSubmit}
      >
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
        <Step6 />
      </Form>
    </FormProvider>
  );
};
