import { Invoice } from "@/lib/types/invoice";
import { createInvoice, fetchInvoices } from "@/utils/api";
import React, { useCallback } from "react";

export default function useInvoices() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const init = async () => {
    setLoading(true);
    try {
      const data = await fetchInvoices();
      setInvoices(data);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  const addInvoice = useCallback(async (invoice: Invoice) => {
    try {
      const created = await createInvoice(invoice);
      setInvoices(prev => [...prev, created]);
    } catch (err) {
      throw new Error(typeof err === "string" ? err : " Error add invoice");
    }
  }, []);

  return { invoices, loading, error, addInvoice };
  // return { invoices, loading, error, addInvoice, removeInvoice, editInvoice}
}
