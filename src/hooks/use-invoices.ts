"use client";

import { useQueryParams } from "@/hooks";
import { InvoiceFormValues } from "@/lib/schemas/invoice-schema";
import { Invoice } from "@/lib/types/invoice";
import { createInvoice, fetchInvoices } from "@/utils/api";
import React, { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";

export default function useInvoices() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [filteredInvoices, setFilteredInvoices] = React.useState<Invoice[]>([]);

  // Load Invoices from Local Storage
  const init = async () => {
    setLoading(true);
    try {
      const data = await fetchInvoices();
      setInvoices(data);
      setFilteredInvoices(data);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  // Filter Invoices
  const { updateQueryParams } = useQueryParams();

  const { control } = useForm({
    defaultValues: {
      nameLike: "",
      status: "" as InvoiceFormValues["status"],
    },
  });
  const filterValues = useWatch({ control, name: ["nameLike", "status"] });

  const filterInvoices = () => {
    const [nameLike, status] = filterValues;
    const filteredData = invoices.filter(inv => (status.length < 1 || inv.status === status) && inv.name.includes(nameLike));
    setFilteredInvoices(filteredData);
    updateQueryParams({ nameLike, status });
  };

  React.useEffect(() => {
    filterInvoices();
  }, [filterValues]);

  // Invoices Actions
  const addInvoice = useCallback(async (invoice: Invoice) => {
    try {
      const created = await createInvoice(invoice);
      setInvoices(prev => [...prev, created]);
    } catch (err) {
      throw new Error(typeof err === "string" ? err : " Error add invoice");
    }
  }, []);

  return { control, invoices: filteredInvoices, loading, error, addInvoice };
  // return { invoices, loading, error, addInvoice, removeInvoice, editInvoice}
}
