interface InvoiceStatus {
  label: string
  value: string
}

export const INVOICE_STATUSES: InvoiceStatus[] = [
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "Unpaid",
    value: "unpaid",
  },
  {
    label: "Pending",
    value: "pending",
  }
]