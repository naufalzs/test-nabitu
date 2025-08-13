"use client";

import { useQueryParams } from "@/hooks";
import { InvoiceFormValues } from "@/lib/schemas/invoice-schema";
import { Invoice } from "@/lib/types/invoice";
import { createInvoice, editInvoice, fetchInvoices, removeInvoice } from "@/utils/api";
import React, { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";

export default function useInvoices() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [filteredInvoices, setFilteredInvoices] = React.useState<Invoice[]>([]);

  // Load Invoices from Local Storage
  const init = async () => {
    try {
      const data = await fetchInvoices();
      await new Promise<void>(resolve =>
        setTimeout(() => {
          resolve();
        }, 500)
      );
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
    const filteredData = invoices.filter(inv => (status.length < 1 || inv.status === status) && inv.name.toLowerCase().includes(nameLike.toLowerCase()));
    setFilteredInvoices(filteredData);
    updateQueryParams({ nameLike, status });
  };

  React.useEffect(() => {
    filterInvoices();
  }, [filterValues, invoices]);

  // Invoices Actions
  const addInvoice = useCallback(async (invoice: Invoice) => {
    setLoading(true);
    try {
      const created = await createInvoice(invoice);
      await new Promise<void>(resolve =>
        setTimeout(() => {
          setInvoices(prev => [...prev, created]);
          resolve();
        }, 1000)
      );
    } catch (err) {
      throw new Error(typeof err === "string" ? err : " Error add invoice");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteInvoice = useCallback(async (id: Invoice["id"]) => {
    await removeInvoice(id);
    setInvoices(prev => {
      return prev.filter(item => item.id !== id);
    });
  }, []);

  const updateInvoice = useCallback(async (id: Invoice["id"], newInvoice: Omit<Invoice, "id">) => {
    await editInvoice(id, newInvoice);

    const updatedInvoices = [...invoices];
    const editIdx = [...invoices].findIndex(item => item.id === id);
    updatedInvoices[editIdx] = { id, ...newInvoice };

    setInvoices(() => updatedInvoices);
  }, []);

  return { control, invoices: filteredInvoices, loading, error, addInvoice, deleteInvoice, updateInvoice };
}
