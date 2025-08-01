import { InvoiceStatusValue } from "@/constants/invoices/status";

export interface Invoice {
  id: string;
  name: string;
  number: string;
  due_date: Date;
  amount: string;
  status: InvoiceStatusValue;
}
