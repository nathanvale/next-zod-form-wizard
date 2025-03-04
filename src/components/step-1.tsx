"use client";

import {
  useAdditionalContext,
  getMeta,
  Step1FieldData,
  Step1FieldNames,
} from "#lib/forms/f2";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step1 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step1FieldData>();
  const { setCurrentStep, saveFormData } = useAdditionalContext();
  return (
    <>
      <Stack>
        <Typography variant="h1">Step 1</Typography>
        <Controller<Step1FieldData, Step1FieldNames>
          name={"applicant.profile.firstName"}
          control={control}
          render={({ field }) => {
            const { label, description, placeholder } =
              getMeta<Step1FieldNames>("applicant.profile.firstName");
            const error = errors.applicant?.profile?.firstName;
            return (
              <TextField
                {...field}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error?.message || description}
                fullWidth
                margin="normal"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            );
          }}
        />
        <Controller<Step1FieldData, Step1FieldNames>
          name={"applicant.profile.lastName"}
          control={control}
          render={({ field }) => {
            const { label, description, placeholder } =
              getMeta<Step1FieldNames>("applicant.profile.lastName");
            const error = errors.applicant?.profile?.lastName;
            return (
              <TextField
                {...field}
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error?.message || description}
                fullWidth
                margin="normal"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            );
          }}
        />
      </Stack>
    </>
  );
};
