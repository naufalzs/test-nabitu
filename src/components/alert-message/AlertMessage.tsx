import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { Alert, AlertTitle, Box } from "@mui/material";
import React, { ReactNode } from "react";

const AlertTheme = {
  success: {
    color: "green.300",
    icon: <CheckIcon />,
  },
  info: {
    color: "blue.300",
    icon: <InfoIcon />,
  },
  error: {
    color: "red.300",
    icon: <CloseIcon />,
  },
} as const;

export type AlertType = keyof typeof AlertTheme;

interface AlertMessageProps {
  type: AlertType;
  title: string;

  children: ReactNode;
}

const AlertMessage = React.forwardRef<HTMLDivElement, AlertMessageProps>(({ type, title, children }, ref) => {
  const { color: _color, icon } = AlertTheme[type];

  return (
    <Alert
      ref={ref}
      severity={type}
      sx={{
        marginBottom: 4,
        py: 5,
        pl: 10,
        borderWidth: "0 0 0 7px",
        borderStyle: "solid",
        borderColor: _color,
        "& .MuiAlert-icon": {
          marginRight: "30px",
        },
      }}
      icon={
        <Box width={32} height={32} borderRadius={"6px"} display={"flex"} justifyContent={"center"} alignItems={"center"} bgcolor={_color} color={"white"}>
          {icon}
        </Box>
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
});

export default AlertMessage;
