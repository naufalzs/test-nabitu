import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { INVOICE_STATUSES } from "@/constants/invoiceStatus";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, Container, MenuItem, TextField, Typography } from "@mui/material";

const INVOICES_DUMMY = [
  {
    number: "INV202501",
    name: "Internet Subscription",
    dueDate: "2025-01-13",
    status: "paid",
    amount: 582901,
  },
  {
    number: "INV202502",
    name: "Electricity Bill",
    dueDate: "2025-02-04",
    status: "paid",
    amount: 311909,
  },
  {
    number: "INV202503",
    name: "Gym Membership",
    dueDate: "2025-02-23",
    status: "unpaid",
    amount: 425000,
  },
  {
    number: "INV202504",
    name: "Phone Bill",
    dueDate: "2025-02-23",
    status: "pending",
    amount: 148891,
  },
];

export default function ListPage() {
  return (
    <Container sx={{ pt: 13 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" component={"h1"} fontWeight={"700"}>
          My Invoices
        </Typography>
        <Box display={"flex"} columnGap={6}>
          <TextField
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
          <TextField
            select
            variant="filled"
            type="text"
            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}
            sx={{
              width: 135,
            }}
          >
            {INVOICE_STATUSES.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
                {INVOICES_DUMMY.map(invoice => {
                  const invoiceTheme = INVOICE_STATUSES.find(invStatus => invStatus.value === invoice.status);
                  console.log("invoiceTheme", invoiceTheme);
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
                      <TableCell>{invoice.dueDate}</TableCell>
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
}
