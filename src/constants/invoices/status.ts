export const INVOICE_STATUS_VALUES = ["paid", "unpaid", "pending"] as const;

export type InvoiceStatusValue = (typeof INVOICE_STATUS_VALUES)[number];

interface InvoiceStatusItem {
  label: string;
  value: InvoiceStatusValue[number];
  color: string;
  bgColor: string;
}

export const INVOICE_STATUSES: readonly InvoiceStatusItem[] = [
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
