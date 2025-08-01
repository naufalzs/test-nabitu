import { INVOICE_STATUS_VALUES } from "@/constants/invoices/status";
import z from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z.coerce.number("Invoice number is required").int("Number must be integer").min(1, "Number must be equal or greater than 1"),
  due_date: z
    .date()
    .nullable()
    .refine(val => val !== null, "Due Date is required"),
  amount: z.coerce.number("Invoice amount is required").int("Amount must be integer").min(1, "Amount must be equal or greater than 1"),
  status: z.enum(INVOICE_STATUS_VALUES, "Invoice status required"),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
export type InvoiceFormInput = z.input<typeof invoiceSchema>;
