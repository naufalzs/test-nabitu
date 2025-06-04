"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#3C50E0",
    },
    text: {
      primary: "#1C2434",
    },
  },
  typography: {
    fontFamily: "var(--font-open-sans)",
  },
});
