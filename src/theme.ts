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
    red: {
      50: "#FBF0F1",
      500: "#D34053",
      600: "#F23030",
    },
    blue: {
      50: "#F1F5F9",
      300: "#E2E8F0",
      500: "#637381",
      700: "#64748B",
    },
    gray: {
      50: "#F7F9FC",
      200: "#F0F0F0",
      500: "#9D9D9D",
      600: "#7E7E7E",
    },
    green: {
      50: "#EDF7F1",
      300: "#34D399",
      700: "#219653",
      900: "#004434",
    },
    orange: {
      50: "#FFF8EB",
      400: "#FFA70B",
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
    inter: {
      fontFamily: inter.style.fontFamily,
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
    subtitle3: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 0.1,
    },
    body3: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 0.1,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          "&.MuiButton-sizeLarge": {
            padding: "13px 70px",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
        standardSuccess: {
          backgroundColor: "#E1F9F0",
          color: "#637381",
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          color: "#004434",
          fontWeight: "700",
          marginBottom: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiInputBase-input": {
            padding: "13px 22px ",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1.5px",
            borderColor: theme.palette.blue[300],
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.blue[500],
            },
          },
          "&:hover": {
            " .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.blue[500],
            },
          },
          "& .MuiInputAdornment-outlined": {
            backgroundColor: theme.palette.divider,
            padding: "24px 28px ",
            borderTopLeftRadius: theme.shape.borderRadius + "px",
            borderBottomLeftRadius: theme.shape.borderRadius + "px",
          },
        }),
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "white",
          borderRadius: 10,
          "& .MuiFilledInput-input": {
            padding: "10px 12px",
          },
          "&:hover": {
            backgroundColor: theme.palette.gray[200],
          },
        }),
      },
    },
  },
});
