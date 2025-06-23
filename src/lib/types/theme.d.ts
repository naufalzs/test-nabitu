import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypeText {
    darker: string;
  }

  interface Palette {
    red: {
      [key: string]: string;
    };
    blue: {
      [key: string]: string;
    };
    gray: {
      [key: string]: string;
    };
    green: {
      [key: string]: string;
    };
    orange: {
      [key: string]: string;
    };
  }

  interface PaletteOptions {
    red?: {
      [key: string]: string;
    };
    blue?: {
      [key: string]: string;
    };
    gray?: {
      [key: string]: string;
    };
    green?: {
      [key: string]: string;
    };
    orange?: {
      [key: string]: string;
    };
  }

  interface TypographyVariants {
    inter: React.CSSProperties;
    subtitle3: React.CSSProperties;
    body3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    inter?: React.CSSProperties;
    subtitle3?: React.CSSProperties;
    body3?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    inter: true;
    subtitle3: true;
    body3: true;
  }
}
