import CheckIcon from "@mui/icons-material/Check";
import { Alert, AlertTitle, Box, Container, Grid, Input, InputBase, Paper, Typography } from "@mui/material";
export default function AddPage() {
  return (
    <Container sx={{ pt: 13 }}>
      <Typography variant="h5" component={"h1"} fontWeight={"700"}>
        Add Invoice
      </Typography>
      <Paper
        sx={{
          my: 9,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "blue.300",
          boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07);",
        }}
      >
        <Box
          px={6.5}
          py={4}
          sx={{
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderColor: "blue.300",
          }}
        >
          <Typography variant="subtitle1">Invoice Form</Typography>
        </Box>
        <Box px={6.5} py={4}>
          <Grid container rowSpacing={4.5} columnSpacing={9}>
            <Grid size={7}>
              <InputBase placeholder="Enter your invoice name" />
            </Grid>
            <Grid size={5}>
              <Input placeholder="Enter your invoice number" />
            </Grid>
            <Grid size={7}>
              <Input placeholder="DD/MM/YYYY" />
            </Grid>
            <Grid size={5}>
              <Input placeholder="Enter your invoice amount" />
            </Grid>
            <Grid size={7}>
              <Input placeholder="Choose Status" />
            </Grid>
          </Grid>
        </Box>
      </Paper>
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
