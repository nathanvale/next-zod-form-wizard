import Link from "next/link";
import {
  Box,
  BoxProps,
  Button,
  CardContent,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import { CloudDone } from "@mui/icons-material";
import { Body2, H3, Subtitle2 } from "#components/typography";
import React from "react";

export interface FormToolbarProps
  extends Omit<StackProps, "children" | "title"> {
  handleSave: () => Promise<void>;
  isSaving: boolean;
  isSubmitting: boolean;
  saveMessage?: string;
  saveHref: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const FormToolbar = ({
  handleSave,
  isSaving,
  isSubmitting,
  saveMessage = "Not saved yet",
  saveHref,
  title,
  description,
  ...props
}: FormToolbarProps) => {
  return (
    <Stack direction={"column"} gap={2} {...props}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        {...props}
      >
        <H3 fontWeight={600} flexGrow={1} color="primary.main">
          {title}
        </H3>
        <Stack gap={1} flexDirection={"row"}>
          <Button
            variant="text"
            size="small"
            data-auto-save
            onClick={handleSave}
            disabled={isSaving || isSubmitting}
            loading={isSaving}
          >
            Save
          </Button>
          <Button
            component={Link}
            variant="text"
            size="small"
            href={saveHref}
            disabled={isSaving || isSubmitting}
            data-auto-save
          >
            Save & Exit
          </Button>
        </Stack>
      </Box>
      <Stack direction={"row"} color="text.secondary" gap={1}>
        <CloudDone color="inherit" fontSize="small" />
        <Body2 color="inherit">{saveMessage}</Body2>
      </Stack>
      {description && (
        <CardContent
          sx={{ paddingBottom: 2, paddingTop: 0, maxWidth: "42rem" }}
        >
          <Typography>{description}</Typography>
        </CardContent>
      )}
    </Stack>
  );
};
