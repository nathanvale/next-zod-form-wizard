"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Lato } from "next/font/google";
import { F2Provider } from "#lib/forms/f2";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily,
  },
  // ...add other theme customizations here...
});

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <F2Provider>{children}</F2Provider>
  </ThemeProvider>
);
