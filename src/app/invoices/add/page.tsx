import { INVOICE_STATUSES } from "@/constants/invoiceStatus";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { Alert, AlertTitle, Box, Button, Container, Grid, InputAdornment, MenuItem, Paper, TextField, Typography } from "@mui/material";
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
        <Box px={6.5} pt={4} pb={9}>
          <Grid container rowSpacing={4.5} columnSpacing={9}>
            <Grid size={7}>
              <Box>
                <Typography variant="subtitle2" color="textDarker" marginBottom={3}>
                  Name{" "}
                  <Typography component={"span"} color="red.600">
                    *
                  </Typography>
                </Typography>
                <TextField sx={{ width: "100%" }} variant="outlined" placeholder="Enter your invoice name" type="text" />
              </Box>
            </Grid>
            <Grid size={5}>
              <Box>
                <Typography variant="subtitle2" color="textDarker" marginBottom={3}>
                  Number{" "}
                  <Typography component={"span"} color="red.600">
                    *
                  </Typography>
                </Typography>
                <TextField sx={{ width: "100%" }} variant="outlined" placeholder="Enter your invoice number" type="number" />
              </Box>
            </Grid>
            <Grid size={7}>
              <Box>
                <Typography variant="subtitle2" color="textDarker" marginBottom={3}>
                  Due Date{" "}
                  <Typography component={"span"} color="red.600">
                    *
                  </Typography>
                </Typography>
                <TextField sx={{ width: "100%" }} variant="outlined" placeholder="DD/MM/YY" type="date" />
              </Box>
            </Grid>
            <Grid size={5}>
              <Box>
                <Typography variant="subtitle2" color="textDarker" marginBottom={3}>
                  Amount{" "}
                  <Typography component={"span"} color="red.600">
                    *
                  </Typography>
                </Typography>
                <TextField
                  sx={{ width: "100%", "& .MuiInputBase-root": { pl: 0 } }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start" component={"div"}>
                          <Typography variant="body1">Rp</Typography>
                        </InputAdornment>
                      ),
                    },
                  }}
                  variant="outlined"
                  placeholder="Choose the status"
                  type="number"
                />
              </Box>
            </Grid>
            <Grid size={7}>
              <Box>
                <Typography variant="subtitle2" color="textDarker" marginBottom={3}>
                  Choose Status{" "}
                  <Typography component={"span"} color="red.600">
                    *
                  </Typography>
                </Typography>
                <TextField select sx={{ width: "100%" }} variant="outlined" placeholder="Choose the status">
                  {INVOICE_STATUSES.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
          </Grid>
          <Box display={"flex"} justifyContent={"end"}>
            <Button sx={{ mt: 15 }} color="secondary" variant="contained" size="large" startIcon={<AddIcon />}>
              Add Invoice
            </Button>
          </Box>
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
