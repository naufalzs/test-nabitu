"use client";

import { NumberFormat } from "@/components/number-format";
import { INVOICE_STATUSES } from "@/constants/invoiceStatus";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { Alert, AlertTitle, Box, Button, Container, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enGB } from "date-fns/locale";
import { Controller, useForm } from "react-hook-form";

export default function AddPage() {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
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
                <Controller
                  name="name"
                  control={control}
                  defaultValue={""}
                  render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      sx={{ width: "100%" }}
                      variant="outlined"
                      placeholder="Enter your invoice name"
                      type="text"
                    />
                  )}
                />
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
                <Controller
                  name="number"
                  control={control}
                  defaultValue={""}
                  render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      sx={{ width: "100%" }}
                      variant="outlined"
                      placeholder="Enter your invoice number"
                      type="number"
                    />
                  )}
                />
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
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                      <>
                        <DatePicker sx={{ width: "100%" }} value={value} onChange={onChange} />
                      </>
                    )}
                  />
                </LocalizationProvider>
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
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={""}
                  render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                    <TextField
                      helperText={error ? error.message : null}
                      error={!!error}
                      onChange={onChange}
                      value={value}
                      sx={{ width: "100%", "& .MuiInputBase-root": { pl: 0 } }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start" component={"div"}>
                              <Typography variant="body1">Rp</Typography>
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormat as any,
                        },
                      }}
                      variant="outlined"
                      placeholder="Enter your invoice amount"
                      type="text"
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid size={7}>
              <Box>
                <Typography variant="subtitle2" color="textDarker" marginBottom={3}>
                  Status{" "}
                  <Typography component={"span"} color="red.600">
                    *
                  </Typography>
                </Typography>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={""}
                  render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                    <FormControl sx={{ width: "100%" }} variant="outlined">
                      {!value && <InputLabel sx={{ top: -3 }}>Enter your invoice number</InputLabel>}
                      <TextField id="status" select helperText={error ? error.message : null} error={!!error} onChange={onChange} value={value} variant="outlined" placeholder="Ent" type="number">
                        {INVOICE_STATUSES.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          <Box display={"flex"} justifyContent={"end"}>
            <Button onClick={handleSubmit(onSubmit)} sx={{ mt: 15 }} color="secondary" variant="contained" size="large" startIcon={<AddIcon />}>
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
