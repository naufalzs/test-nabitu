"use client";

import { createTheme } from "@mui/material";
import { Inter, Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#EFF4FB", // main button / most button colors
    },
    secondary: {
      main: "#3C50E0",
    },
    text: {
      primary: "#1C2434",
      darker: "#212B36",
    },
    blue: {
      50: "#F1F5F9",
      300: "E2E8F0",
      500: "#637381",
      700: "#64748B",
    },
    gray: {
      200: "#F0F0F0",
      500: "#9D9D9D",
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
    inter: {
      fontFamily: inter.style.fontFamily,
    },
  },
});
