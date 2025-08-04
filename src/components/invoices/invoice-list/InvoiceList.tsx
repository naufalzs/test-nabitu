"use client";

import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { INVOICE_STATUSES } from "@/constants/invoices/status";
import useInvoices from "@/hooks/use-invoices";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, Container, FormControl, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import { Controller } from "react-hook-form";

const InvoiceList = () => {
  const { control, invoices } = useInvoices();

  return (
    <Container sx={{ pt: 13 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" component={"h1"} fontWeight={"700"}>
          My Invoices
        </Typography>
        <Box display={"flex"} columnGap={6}>
          <Controller
            name="nameLike"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
              <TextField
                onChange={onChange}
                value={value}
                variant="filled"
                placeholder="Search"
                type="text"
                slotProps={{
                  input: {
                    disableUnderline: true,
                    startAdornment: <SearchIcon sx={{ color: "gray.600" }} />,
                  },
                }}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
              <FormControl variant="filled">
                {!value && <InputLabel sx={{ top: -5 }}>All status</InputLabel>}
                <TextField
                  select
                  onChange={onChange}
                  value={value}
                  type="text"
                  variant="filled"
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                  }}
                  sx={{
                    width: 135,
                  }}
                >
                  <MenuItem value="">All Status</MenuItem>
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
      </Box>
      <Paper
        sx={{
          my: 9,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "blue.300",
          boxShadow: "0px 8px 13px -3px rgba(0, 0, 0, 0.07);",
        }}
      >
        <Box px={7.5} pt={7.5} pb={10}>
          <TableContainer>
            <Table aria-label="invoices table">
              <TableHead
                sx={{
                  "& th, & td": { typography: "subtitle1" },
                  bgcolor: "gray.50",
                  "& th": {
                    padding: "15px 25px",
                    border: 0,
                    "&:first-child": {
                      paddingLeft: "30px",
                    },
                    "&:last-child": {
                      paddingRight: "30px",
                    },
                  },
                }}
              >
                <TableRow>
                  <TableCell>Invoice</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ "& th, & td": { typography: "body1" } }}>
                {invoices.map(invoice => {
                  const invoiceTheme = INVOICE_STATUSES.find(invStatus => invStatus.value === invoice.status);
                  return (
                    <TableRow
                      key={invoice.name}
                      sx={{
                        "& th, & td": {
                          padding: "15px 25px",
                          "&:first-child": {
                            paddingLeft: "30px",
                          },
                          "&:last-child": {
                            paddingRight: "30px",
                          },
                        },
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box>
                          <Box>{invoice.name}</Box>
                          <Box
                            sx={{
                              typography: "subtitle2",
                              color: "blue.700",
                            }}
                          >
                            {invoice.number}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{format(invoice.due_date, "MMM d,yyyy")}</TableCell>
                      <TableCell>
                        <Chip
                          label={invoice.status.toLowerCase()}
                          sx={{ bgcolor: invoiceTheme?.bgColor, color: invoiceTheme?.color, typography: "body2", fontWeight: 500, textTransform: "capitalize" }}
                        />
                      </TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell align="center">
                        <MenuIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
};

export default InvoiceList;
