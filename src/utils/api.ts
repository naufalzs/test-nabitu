import { Invoice } from "@/lib/types/invoice";

const getInvoices = (): Invoice[] | null => {
  const data = window.localStorage.getItem("invoices");
  return data ? JSON.parse(data) : null;
};

const setInvoices = (newInvoices: Invoice[]): void => {
  window.localStorage.setItem("invoices", JSON.stringify(newInvoices));
};

export async function fetchInvoices() {
  const data = getInvoices();
  if (!data) throw new Error("invoices data not found");

  return data;
}

export async function createInvoice(invoice: Invoice) {
  const data = getInvoices();
  if (!invoice) throw new Error("no invoice provided");
  if (!data) throw new Error("invoices data not found");

  const newInvoices = [...data, invoice];
  setInvoices(newInvoices);
  return invoice;
}
