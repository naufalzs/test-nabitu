import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
  interface TypeText {
    darker: string;
  }

  interface Palette {
    blue: {
      [key: string]: string;
    };
    gray: {
      [key: string]: string;
    };
  }

  interface PaletteOptions {
    blue?: {
      [key: string]: string;
    };
    gray?: {
      [key: string]: string;
    };
  }

  interface TypographyVariants {
    inter: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    inter?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    inter: true;
  }
}
