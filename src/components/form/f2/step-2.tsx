"use client";

import { Card } from "#components/core/card";
import { getMeta, Step2FieldData, Step2FieldNames } from "#lib/forms/f2";
import { Stack, TextField, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step2 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step2FieldData>();
  return (
    <Stack>
      <Card variant="form" title="Step 2">
        <Controller<Step2FieldData, Step2FieldNames>
          name={"interpreter"}
          control={control}
          render={({ field }) => {
            const { label, description, placeholder } =
              getMeta<Step2FieldNames>("interpreter");
            const error = errors.interpreter;
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
