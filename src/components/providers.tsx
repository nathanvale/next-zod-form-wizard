"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Lato } from "next/font/google";
import { F2Provider } from "#lib/forms/f2";
import { theme } from "#lib/mui-theme";
import { Container } from "@mui/material";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <F2Provider>
      <Container>{children}</Container>
    </F2Provider>
  </ThemeProvider>
);
