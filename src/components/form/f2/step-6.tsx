"use client";

import { Card } from "#components/core/card";
import { getMeta, Step6FieldValues, Step6FieldNames } from "#lib/forms/f2";
import { Stack, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const Step6 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Step6FieldValues>();
  return (
    <Stack>
      <Card variant="form" title="Height">
        <Controller<Step6FieldValues, Step6FieldNames>
          name={"height"}
          control={control}
          render={({ field }) => {
            const { label, description, placeholder } =
              getMeta<Step6FieldNames>("height");
            const error = errors.height;
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
