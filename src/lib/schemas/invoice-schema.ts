import { INVOICE_STATUS_VALUES } from "@/constants/invoices/status";
import z from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z.nullable(z.number("Invoice number must be a number").min(1, "Invoice number couldn't be negative number")),
  due_date: z
    .date()
    .nullable()
    .refine(val => val !== null, "Due Date is required"),
  amount: z.string("Invoice amount is required"),
  status: z.enum(INVOICE_STATUS_VALUES, "Invoice status required"),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
