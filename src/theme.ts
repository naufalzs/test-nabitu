"use client";

import { Inter, Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material";

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
      main: "#3C50E0",
    },
    text: {
      primary: "#1C2434",
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
    inter: {
      fontFamily: inter.style.fontFamily,
    },
  },
});
