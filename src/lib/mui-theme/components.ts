import { Theme } from "@mui/material";

import { breakpoints } from "./breakpoints";
import { palette } from "./palette";
import { typography } from "./typography";

export const components: Partial<Theme["components"]> = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        [`@media (min-width: ${breakpoints.values.md}px)`]: {
          boxShadow: "none",
        },
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      loading: {
        ...typography.body1,
        fontWeight: 500,
      },
      noOptions: { ...typography.body1, fontWeight: 500 },
      root: {
        marginBottom: "0.5rem",
        marginTop: "1rem",
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: palette.common.white,
        color: palette.primary.main,
        fontSize: "1.25rem",
        fontStyle: "normal",
        fontWeight: 400,
        letterSpacing: "0.00875rem",
        lineHeight: "1.25rem",
        textAlign: "center",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      contained: {
        boxShadow:
          "0px 0.0625rem 0.625rem 0px rgba(0, 0, 0, 0.12), 0px 0.25rem 0.3125rem 0px rgba(0, 0, 0, 0.14), 0px 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.20)",
      },
      outlined: {
        borderColor: palette.primary.main,
        borderStyle: "solid",
        borderWidth: "0.0625rem",
      },
      outlinedPrimary: {
        borderColor: "rgba(0, 48, 60, 0.50)",
      },
      root: {
        borderRadius: "0.25rem",
        display: "inline-flex",
        justifyContent: "center",
        textTransform: "none",
      },
      sizeLarge: {
        fontSize: "0.9375rem",
        lineHeight: "1.625rem",
        padding: "0.5rem 1.375rem",
      },
      sizeMedium: {
        fontSize: "0.875rem",
        letterSpacing: "0.025rem",
        lineHeight: "1.5rem",
        padding: "0.375rem 1rem",
      },
      sizeSmall: {
        fontSize: "0.875rem",
        letterSpacing: "0.02875rem",
        lineHeight: "1.375rem",
      },
      text: {
        textDecoration: "underline", // Add underline by default
        "&:hover": {
          textDecoration: "none", // Remove underline on hover
        },
      },
    },
    variants: [
      {
        props: { color: "secondary", variant: "contained" },
        style: {
          backgroundColor: palette.secondary.main,
          color: palette.primary.main,
        },
      },
    ],
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: "background.paper",
        borderColor: "divider",
        borderRadius: "0.25rem",
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        "& .MuiFormControlLabel-label": {
          fontWeight: 600,
        },
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {},
    },
  },
  MuiIcon: {
    styleOverrides: {
      fontSizeSmall: {
        fontSize: "1rem",
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        ...typography.body1,
        color: palette.text.secondary,
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {},
    },
  },
  MuiModal: {
    styleOverrides: {
      root: {
        "& .MuiTypography-h6": {
          color: palette.primary.main,
          fontWeight: 600,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: "1rem",
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {},
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        alignItems: "center",
        color: palette.primary.main,
        display: "flex",
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: 500,
        gap: "0.5rem",
        height: "auto",
        justifyContent: "center",
        letterSpacing: "0.025rem",
        lineHeight: "1.5rem",
        minHeight: "unset",
        minWidth: "unset",
        padding: "0.5625rem 1rem",
        textTransform: "none",
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      flexContainer: {
        gap: "2.5rem",
      },
      indicator: {
        backgroundColor: palette.success.light,
      },
      root: {
        borderBottom: "none",
        height: "auto",
        minHeight: "unset",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiFormHelperText-root": {},
        "& .MuiFormLabel-root": {
          ...typography.body1,
        },
        "& .MuiInputBase-input": {
          ...typography.body1,
        },
        "& .MuiInputBase-root": {},
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      style: {
        fontFeatureSettings: "'liga' off, 'clig' off",
      },
    },
  },
  MuiStep: {
    styleOverrides: {
      root: {},
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: {
        // Example styles for MuiStepLabel
        ...typography.subtitle2,
        color: palette.text.primary,
        "&.Mui-completed": {},
        "&.Mui-active": {},
        "&.Mui-error": {
          color: palette.error.main,
        },
      },
    },
  },
  MuiStepContent: {
    styleOverrides: {
      root: {},
    },
  },
  MuiStepper: {
    styleOverrides: {
      root: {},
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: palette.secondary.main,
        "&.Mui-active": {
          color: palette.primary.main,
          "& > text": {
            fill: palette.common.white,
          },
        },
      },
      active: {},
      text: {
        ...typography.caption,
        fill: palette.primary.main,
      },
    },
  },
};
