interface InvoiceStatus {
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

export const INVOICE_STATUSES: InvoiceStatus[] = [
  {
    label: "Paid",
    value: "paid",
    color: "green.700",
    bgColor: "green.50",
  },
  {
    label: "Unpaid",
    value: "unpaid",
    color: "red.500",
    bgColor: "red.50",
  },
  {
    label: "Pending",
    value: "pending",
    color: "orange.400",
    bgColor: "orange.50",
  },
];
