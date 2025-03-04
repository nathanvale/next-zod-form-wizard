import { Theme } from "@mui/material";

import { lato } from "./font";
import { palette } from "./palette";

export const typography: Partial<Theme["typography"]> = {
  body1: {
    color: palette.primary.main,
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0.009375rem",
    lineHeight: "1.5rem",
  },
  body2: {
    color: palette.text.primary,
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0.010625em",
    lineHeight: "1.25rem",
  },
  caption: {
    color: palette.text.primary,
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0.025rem",
    lineHeight: "1.25rem",
  },
  fontFamily: lato.style.fontFamily,
  h1: {
    color: palette.primary.main,
    fontSize: "2.125rem",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0.015625rem",
    lineHeight: "2.625rem",
  },
  h2: {
    color: palette.text.primary,
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "2rem",
  },
  h3: {
    color: palette.text.primary,
    fontSize: "1.25rem",
    fontStyle: "normal",
    fontWeight: 500,
    letterSpacing: "0.009375rem",
    lineHeight: "2rem",
  },
  overline: {
    color: palette.text.primary,
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0.0625rem",
    lineHeight: "2rem",
    textTransform: "uppercase",
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    letterSpacing: "0.009375rem",
    lineHeight: "1.75rem",
  },
  subtitle2: {
    color: palette.text.primary,
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 500,
    letterSpacing: "0.00625rem",
    lineHeight: "1.375rem",
  },
};
