import { InvoiceFormInput, InvoiceFormValues, invoiceSchema } from "@/lib/schemas/invoice-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useInvoiceForms(onSubmit: (data: InvoiceFormValues) => void) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InvoiceFormInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      number: "",
      due_date: null,
      amount: "",
      status: "" as InvoiceFormValues["status"],
    },
  });

  const submitForm = handleSubmit((values: unknown) => {
    onSubmit(values as InvoiceFormValues);
  });

  return {
    control,
    submitForm,
    errors,
    isSubmitting,
  };
}
