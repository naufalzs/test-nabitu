import { InvoiceForm } from "@/components";
import CheckIcon from "@mui/icons-material/Check";
import { Alert, AlertTitle, Box, Container, Typography } from "@mui/material";

export default function AddPage() {
  return (
    <Container sx={{ pt: 13 }}>
      <Typography variant="h5" component={"h1"} fontWeight={"700"}>
        Add Invoice
      </Typography>

      <InvoiceForm />

      <Alert
        severity="success"
        sx={{
          py: 5,
          pl: 10,
          borderWidth: "0 0 0 7px",
          borderStyle: "solid",
          borderColor: "green.300",
          "& .MuiAlert-icon": {
            marginRight: "30px",
          },
        }}
        icon={
          <Box width={32} height={32} borderRadius={"6px"} display={"flex"} justifyContent={"center"} alignItems={"center"} bgcolor={"green.300"} color={"white"}>
            <CheckIcon />
          </Box>
        }
      >
        <AlertTitle>Success</AlertTitle>
        This is a success Alert with an encouraging title.
      </Alert>
    </Container>
  );
}
