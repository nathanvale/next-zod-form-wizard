"use client";

import {
  useAdditionalContext,
  getMeta,
  Step1FieldData,
  Step1FieldNames,
} from "#lib/forms/f2";
import { Stack, TextField, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { Card } from "./card";

export const Step1 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step1FieldData>();
  return (
    <>
      <Card variant="outlined" title="Who can use this form">
        <Stack>
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
          <Controller<Step1FieldData, Step1FieldNames>
            name={"representative.profile.firstName"}
            control={control}
            render={({ field }) => {
              const { label, description, placeholder } =
                getMeta<Step1FieldNames>("representative.profile.firstName");
              const error = errors.representative?.profile?.firstName;
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
            name={"representative.profile.lastName"}
            control={control}
            render={({ field }) => {
              const { label, description, placeholder } =
                getMeta<Step1FieldNames>("representative.profile.lastName");
              const error = errors.representative?.profile?.lastName;
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
      </Card>
    </>
  );
};
