"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Lato } from "next/font/google";
import { theme } from "#lib/mui-theme";
import { Container } from "@mui/material";
import { FormProvider } from "./form/provider";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container
      maxWidth="lg"
      sx={{
        flexGrow: 1,
        pb: { md: 3, xs: 2 },
        pt: { md: 7, xs: 2 },
        px: { md: 3, xs: 2 },
      }}
    >
      {children}
    </Container>
  </ThemeProvider>
);
