"use client";

import { Card } from "#components/core/card";
import { getMeta, Step3FieldData, Step3FieldNames } from "#lib/forms/f2";
import { Stack, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step3 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step3FieldData>();
  return (
    <Stack>
      <Card variant="form" title="Accessibility">
        <Controller<Step3FieldData, Step3FieldNames>
          name={"accessibility"}
          control={control}
          render={({ field }) => {
            const { label, description, placeholder } =
              getMeta<Step3FieldNames>("accessibility");
            const error = errors.accessibility;
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
