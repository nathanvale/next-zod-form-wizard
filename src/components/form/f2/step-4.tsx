"use client";

import { Card } from "#components/core/card";
import { getMeta, Step4FieldData, Step4FieldNames } from "#lib/forms/f2";
import { Stack, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step4 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step4FieldData>();
  return (
    <Stack>
      <Card variant="form" title="Age">
        <Controller<Step4FieldData, Step4FieldNames>
          name={"age"}
          control={control}
          render={({ field }) => {
            const { label, description, placeholder } =
              getMeta<Step4FieldNames>("age");
            const error = errors.age;
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
