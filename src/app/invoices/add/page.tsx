import { InvoiceForm } from "@/components";
import { Container, Typography } from "@mui/material";

export default function AddPage() {
  return (
    <Container sx={{ pt: 13 }}>
      <Typography variant="h5" component={"h1"} fontWeight={"700"}>
        Add Invoice
      </Typography>

      <InvoiceForm />
    </Container>
  );
}
