import {
  Card as MUICard,
  CardContent,
  CardHeader,
  CardProps as MUICardProps,
  CardActions,
} from "@mui/material";

import { toSentenceCase } from "#lib/utils";
import { Body2, H3 } from "#components/typography";

export interface CardProps extends Omit<MUICardProps, "title" | "variant"> {
  actionButtons?: React.ReactNode;
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  title: React.ReactNode;
  variant?: "outlined" | "secondary" | "form";
}

export const Card = ({
  actionButtons,
  children,
  subtitle,
  title,
  variant = "outlined",
  ...properties
}: CardProps) => {
  return (
    <MUICard
      variant="outlined"
      {...properties}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        ...(variant === "secondary" && { backgroundColor: "secondary.main" }),
      }}
    >
      <CardHeader
        title={
          typeof title === "string" ? <H3>{toSentenceCase(title)}</H3> : title
        }
        subheader={subtitle && <Body2>{subtitle}</Body2>}
        sx={{ p: 2 }}
      />
      {children && (
        <CardContent
          sx={{ flexGrow: 1, p: 2, pt: variant === "form" ? 0 : undefined }}
        >
          {children}
        </CardContent>
      )}
      {actionButtons ? (
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {actionButtons}
        </CardActions>
      ) : undefined}
    </MUICard>
  );
};
