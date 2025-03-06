import { Box, Stack, Typography } from "@mui/material";
import { TypographyProps as MuiTypographyProps } from "@mui/material/Typography";
import { memo } from "react";

const createTypographyComponent = (
  variant: MuiTypographyProps["variant"]
): React.FC<MuiTypographyProps> => {
  const Component: React.FC<MuiTypographyProps> = memo(
    ({ children, ...properties }: MuiTypographyProps) => (
      <Typography {...properties} variant={variant}>
        {children}
      </Typography>
    )
  );
  Component.displayName = `Typography(${variant})`;
  return Component;
};

const createHeaderComponent = (
  variant: MuiTypographyProps["variant"]
): React.FC<MuiTypographyProps & { hasOutline?: boolean }> => {
  const Component: React.FC<MuiTypographyProps & { hasOutline?: boolean }> =
    memo(
      ({
        children,
        hasOutline,
        ...properties
      }: MuiTypographyProps & { hasOutline?: boolean }) => {
        if (!hasOutline)
          return (
            <Typography {...properties} variant={variant}>
              {children}
            </Typography>
          );

        return (
          <Typography {...properties} variant={variant}>
            <Stack width="fit-content" gap={".5rem"}>
              {children}
              {hasOutline && (
                <Box
                  sx={{
                    alignItems: "flex-start",
                    display: "flex",
                    flex: "1 0 0",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0.25rem 0rem 0.25rem 0.125rem",
                  }}
                >
                  <Box
                    sx={{
                      alignSelf: "stretch",
                      bgcolor: "success.light",
                      borderRadius: "0.5rem",
                      height: "0.25rem",
                    }}
                  ></Box>
                </Box>
              )}
            </Stack>
          </Typography>
        );
      }
    );
  Component.displayName = `Typography-header-(${variant})`;
  return Component;
};

export const H1 = createHeaderComponent("h1");
export const H2 = createHeaderComponent("h2");
export const H3 = createHeaderComponent("h3");
export const H4 = createHeaderComponent("h4");
export const H5 = createHeaderComponent("h5");
export const H6 = createHeaderComponent("h6");
export const Subtitle1 = createTypographyComponent("subtitle1");
export const Subtitle2 = createTypographyComponent("subtitle2");
export const Body1 = createTypographyComponent("body1");
export const Body2 = createTypographyComponent("body2");
