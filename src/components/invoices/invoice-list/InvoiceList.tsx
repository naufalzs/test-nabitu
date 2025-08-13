"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { INVOICE_STATUSES } from "@/constants/invoices/status";
import { useNotification } from "@/context/notification-provider";
import useInvoices from "@/hooks/use-invoices";
import { Invoice } from "@/lib/types/invoice";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, Container, FormControl, InputLabel, ListItemIcon, Menu, MenuItem, Skeleton, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller } from "react-hook-form";

interface MenuState {
  anchorEl: HTMLElement | null;
  id: string | null;
}

const InvoiceList = () => {
  const router = useRouter();
  const { loading, control, invoices, deleteInvoice } = useInvoices();
  const { pushNotification } = useNotification();

  const [menuState, setMenuState] = React.useState<MenuState>({ anchorEl: null, id: null });
  const openMenu = Boolean(menuState.anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: Invoice["id"]) => {
    setMenuState({ anchorEl: event.currentTarget, id });
  };

  const handleCloseMenu = () => {
    setMenuState({ anchorEl: null, id: null });
  };

  const _deleteInvoice = async () => {
    const id = menuState.id;
    if (!id) return;

    await deleteInvoice(id);
    pushNotification({
      type: "error",
      title: "Invoice Deleted",
      message: "Invoice deleted from the table and you'll never see it again",
    });
    handleCloseMenu();
  };

  const _editInvoice = async () => {
    const id = menuState.id;
    if (!id) return;

    router.push(`/invoices/add?id=${id}`);
  };

  return (
    <>
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
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rectangular" sx={{ height: 32, borderRadius: 10 }} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rectangular" sx={{ margin: "0 auto", height: 24, width: 24, borderRadius: 2 }} />
                      </TableCell>
                    </TableRow>
                  ) : invoices.length > 0 ? (
                    invoices.map(invoice => {
                      const invoiceTheme = INVOICE_STATUSES.find(invStatus => invStatus.value === invoice.status);
                      return (
                        <TableRow key={invoice.id}>
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
                            <Box sx={{ width: "fit-content", margin: "0 auto", cursor: "pointer" }} onClick={e => handleOpenMenu(e, invoice.id)}>
                              <MenuIcon />
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                        <Typography variant="h6">No Data Found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>

      <Menu anchorEl={menuState.anchorEl} open={openMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={_editInvoice}>
          <ListItemIcon>
            <EditIcon fontSize={"small"} />
          </ListItemIcon>
          <Typography variant="body3">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={_deleteInvoice}>
          <ListItemIcon>
            <DeleteIcon fontSize={"small"} />
          </ListItemIcon>
          <Typography variant="body3">Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default InvoiceList;
