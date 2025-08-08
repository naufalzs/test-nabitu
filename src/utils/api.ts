import { Invoice } from "@/lib/types/invoice";

const getInvoices = (): Invoice[] | [] => {
  const data = window.localStorage.getItem("invoices");
  return data ? JSON.parse(data) : [];
};

export const getInvoice = (id: string): Invoice | null => {
  const datas = getInvoices();
  const data = datas.find(item => item.id === id) ?? null;
  return data;
};

const setInvoices = (newInvoices: Invoice[]): void => {
  window.localStorage.setItem("invoices", JSON.stringify(newInvoices));
};

export async function fetchInvoices() {
  const data = getInvoices();
  if (!data) throw new Error("invoices data not found");

  return data;
}

export async function createInvoice(invoice: Invoice): Promise<Invoice> {
  const data = getInvoices();
  if (!invoice) throw new Error("no invoice provided");
  if (!data) throw new Error("invoices data not found");

  const newInvoices = [...data, invoice];
  setInvoices(newInvoices);
  return invoice;
}

export async function removeInvoice(invoiceId: Invoice["id"]) {
  const data = getInvoices();
  if (!invoiceId) throw new Error("no id provided");
  if (!data) throw new Error("invoices data not found");

  const newInvoices = data.filter(item => item.id !== invoiceId);
  setInvoices(newInvoices);
  return newInvoices;
}

export async function editInvoice(invoiceId: Invoice["id"], invoice: Omit<Invoice, "id">) {
  const data = getInvoices();
  if (!invoiceId) throw new Error("no id provided");
  if (!data) throw new Error("edit invoice input data not found");

  const editIdx = data.findIndex(item => item.id === invoiceId);
  if (editIdx < 0) throw new Error("invoice edit data not found");

  const newInvoices = [...data];
  newInvoices[editIdx] = { ...invoice, id: invoiceId };

  setInvoices(newInvoices);
}

export async function invoiceNumberExists(invoiceNumber: Invoice["number"]): Promise<boolean> {
  const data = getInvoices();
  if (!invoiceNumber) throw new Error("no id provided");
  const itemIdx = data.findIndex(item => item.number === invoiceNumber);

  return itemIdx > -1;
}
