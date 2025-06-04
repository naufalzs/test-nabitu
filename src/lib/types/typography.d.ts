import "@mui/material/styles";
import "@mui/material/Typography";

declare module "@mui/material/styles" {
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
