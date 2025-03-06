import Link from "next/link";
import {
  Box,
  Button,
  CardContent,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import { CloudDone } from "@mui/icons-material";
import { Body2, H3 } from "../core/typography";
import React from "react";

export interface FormToolbarProps
  extends Omit<StackProps, "children" | "title"> {
  handleSave: () => Promise<void>;
  handleSaveAndExit: () => Promise<void>;
  isSaving: boolean;
  isSubmitting: boolean;
  savedMessage: string;
  saveHref: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const FormToolbar = ({
  handleSave,
  isSaving,
  isSubmitting,
  savedMessage,
  saveHref,
  title,
  description,
  handleSaveAndExit,
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
            onClick={handleSaveAndExit}
          >
            Save & Exit
          </Button>
        </Stack>
      </Box>
      <Stack direction={"row"} color="text.secondary" gap={1}>
        <CloudDone color="inherit" fontSize="small" />
        <Body2 color="inherit">{savedMessage}</Body2>
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
