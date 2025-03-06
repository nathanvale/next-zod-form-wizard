"use client";

import { getMeta, Step1FieldValues, Step1FieldNames } from "#lib/forms/f2";
import { Stack, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { Card } from "../../core";
import { StepProps } from "../types";

export const Step1 = ({}: StepProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step1FieldValues>();
  return (
    <Stack spacing={2}>
      <Card variant="form" title="Applicant Details">
        <Stack>
          <Controller<Step1FieldValues, Step1FieldNames>
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
          <Controller<Step1FieldValues, Step1FieldNames>
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
      </Card>
      <Card variant="form" title="Representative Details">
        <Controller<Step1FieldValues, Step1FieldNames>
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
        <Controller<Step1FieldValues, Step1FieldNames>
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
      </Card>
    </Stack>
  );
};
