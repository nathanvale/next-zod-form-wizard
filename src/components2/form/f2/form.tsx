import { useURLSearchParams } from "#lib/hooks/use-url-search-params";
import { usePathname, useRouter } from "next/navigation";
import { BaseForm } from "../base-form";
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

export const Form = () => {
  const pathname = usePathname();
  const { searchParams, createQueryString } = useURLSearchParams();
  const draftFormId = searchParams.get("form-id") as string;
  const router = useRouter();
  const handleSave = async (data: F2FieldValues) => {
    try {
      if (!!draftFormId) {
        // Update existing saved draft form
        const response = await fetch(`/api/forms-mock/${draftFormId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();

        const { modifiedOn } = responseData;
        console.log("update call:", modifiedOn);
      } else {
        // Create a new draft form
        const response = await fetch("/api/forms-mock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        const { formId, modifiedOn } = responseData;
        if (formId) {
          const url = `${pathname}?${createQueryString(
            "form-id",
            `${formId}`
          )}`;
          router.push(url);
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const handleSubmit = async (data: F2FieldValues) => {
    try {
      const response = await fetch("/api/lodgments-mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      console.log("Data submitted:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <FormProvider
      state={state}
      schemas={schemas}
      schema={schema}
      metaData={metaData}
      defaultValues={defaultValues}
    >
      <BaseForm
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
      </BaseForm>
    </FormProvider>
  );
};
