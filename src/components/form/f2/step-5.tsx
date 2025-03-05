"use client";

import { Card } from "#components/core/card";
import { getMeta, Step5FieldValues, Step5FieldNames } from "#lib/forms/f2";
import { Stack, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step5 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step5FieldValues>();
  return (
    <Stack>
      <Card variant="form" title="Gender">
        <Controller<Step5FieldValues, Step5FieldNames>
          name={"gender"}
          control={control}
          render={({ field }) => {
            const { label, description, placeholder } =
              getMeta<Step5FieldNames>("gender");
            const error = errors.gender;
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
