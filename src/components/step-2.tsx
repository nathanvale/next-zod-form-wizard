"use client";

import {
  F2FormData,
  useAdditionalContext,
  getMeta,
  Step2FieldData,
  Step2FieldNames,
} from "#lib/forms/f2";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step2 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step2FieldData>();
  return (
    <Stack>
      <Typography variant="h1">Step 2</Typography>
      <Controller<Step2FieldData, Step2FieldNames>
        name={"respondent.profile.firstName"}
        control={control}
        render={({ field }) => {
          const { label, description, placeholder } = getMeta<Step2FieldNames>(
            "respondent.profile.firstName"
          );
          const error = errors.respondent?.profile?.firstName;
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
      <Controller<Step2FieldData, Step2FieldNames>
        name={"respondent.profile.lastName"}
        control={control}
        render={({ field }) => {
          const { label, description, placeholder } = getMeta<Step2FieldNames>(
            "respondent.profile.lastName"
          );
          const error = errors.respondent?.profile?.lastName;
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
  );
};
