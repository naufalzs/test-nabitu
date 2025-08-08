"use client";

import { NumberFormat } from "@/components";
import { INVOICE_STATUSES } from "@/constants/invoices/status";
import { useNotification } from "@/context/notification-provider";
import { useInvoiceForms, useInvoices, useQueryParams } from "@/hooks";
import { InvoiceFormInput } from "@/lib/schemas/invoice-schema";
import { Invoice } from "@/lib/types/invoice";
import { formatToCurrency } from "@/utils";
import { getInvoice } from "@/utils/api";
import { remapInvoiceEditData } from "@/utils/invoice";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDays } from "date-fns";
import { enGB } from "date-fns/locale";
import { nanoid } from "nanoid";
import React from "react";
import { Controller } from "react-hook-form";

interface EditState {
  id: string | null;
  data: InvoiceFormInput | null;
}

const InvoiceForm = () => {
  const { getQueryParams } = useQueryParams();
  const { pushNotification } = useNotification();

  const [editState, setEditState] = React.useState<EditState>({
    id: null,
    data: null,
  });
  const isEdit = Boolean(editState.id);

  const { loading, addInvoice, updateInvoice } = useInvoices();
  const { control, submitForm, reset } = useInvoiceForms(async data => {
    const { number: _number, amount: _amount } = data;
    const newInvoice = {
      ...data,
      id: isEdit ? editState.id : nanoid(10),
      number: `INV${_number}`,
      amount: `Rp ${formatToCurrency(_amount)}`,
    } as Invoice;

    const isEqual = JSON.stringify({ ...editState.data, due_date: new Date(String(editState.data?.due_date)) }) === JSON.stringify(newInvoice);
    if (isEqual) {
      pushNotification({
        type: "error",
        title: "Nothing Edited",
        message: "You should do any change before update invoice data",
      });
      return;
    }

    if (isEdit && editState.id) {
      const { id, ...updatedInvoice } = newInvoice;
      await updateInvoice(editState.id, updatedInvoice);
    } else {
      await addInvoice(newInvoice);
    }

    pushNotification({
      type: "success",
      title: `Invoice ${isEdit ? "edited" : "added"} successfully!`,
      message: "You can view and manage your invoice in the 'My Invoices' section.",
    });
    setTimeout(() => {
      window.location.href = "/invoices/list";
    }, 2000);
  });

  const loadData = () => {
    const id = getQueryParams("id");

    if (!id) return;
    setEditState(prev => ({ ...prev, id }));
    const editData = getInvoice(id);

    if (!editData) return;
    const _editData = remapInvoiceEditData(editData);
    setEditState(prev => ({ ...prev, data: editData }));
    reset(_editData);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
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
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    disabled={loading}
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    sx={{ width: "100%" }}
                    variant="outlined"
                    placeholder="Enter your invoice name"
                    type="text"
                    autoComplete="off"
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
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    disabled={loading}
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
                  name="due_date"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                    <>
                      <DatePicker
                        sx={{ width: "100%" }}
                        value={value}
                        minDate={addDays(new Date(), 1)}
                        onChange={onChange}
                        disabled={loading}
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
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
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <TextField
                    disabled={loading}
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
                        // eslint-disable-next-line
                        inputComponent: NumberFormat as any,
                      },
                    }}
                    autoComplete="off"
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
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    {!value && <InputLabel sx={{ top: -3, color: "rgba(0, 0, 0, 0.18)" }}>Choose the status</InputLabel>}
                    <TextField disabled={loading} select helperText={error ? error.message : null} error={!!error} onChange={onChange} value={value} variant="outlined" placeholder="Ent" type="number">
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
          <Button loading={loading} loadingPosition="start" onClick={submitForm} sx={{ mt: 15 }} color="secondary" variant="contained" size="large" startIcon={<AddIcon />}>
            {isEdit ? "Edit" : "Add"} Invoice
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default InvoiceForm;
