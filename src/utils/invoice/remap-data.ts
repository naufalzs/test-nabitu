import { InvoiceFormInput } from "@/lib/schemas/invoice-schema";
import { Invoice } from "@/lib/types/invoice";

const remapInvoiceEditData = (data: Invoice): InvoiceFormInput => {
  const { id, number: _number, due_date: _due_date, amount: _amount, ...rest } = data;

  const number = Number(_number.replace("INV", ""));
  const due_date = new Date(_due_date);
  const amount = _amount.replaceAll(".", "");

  return {
    ...rest,
    number,
    due_date,
    amount,
  };
};

export default remapInvoiceEditData;
