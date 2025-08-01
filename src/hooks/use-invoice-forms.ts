import { InvoiceFormValues, invoiceSchema } from "@/lib/schemas/invoice-schema";
import { Invoice } from "@/lib/types/invoice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useInvoiceForms(onSubmit: (data: Omit<Invoice, "id">) => void) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      number: null,
      due_date: null,
      amount: "",
      status: "" as InvoiceFormValues["status"],
    },
  });

  const submitForm = handleSubmit(async values => {
    await onSubmit(values);
    // reset();
  });

  return {
    control,
    submitForm,
    errors,
    isSubmitting,
  };
}
