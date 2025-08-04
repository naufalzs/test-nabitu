import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const updateQueryParams = (newQueryParams: Record<string, string>) => {
    Object.entries(newQueryParams).forEach(([name, value]) => {
      if (value.length > 0) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    });
    router.replace(`${pathname}?${params}`);
  };

  return {
    queryParams: params,
    updateQueryParams,
  };
}
