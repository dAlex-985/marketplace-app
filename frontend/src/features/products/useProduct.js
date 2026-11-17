import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";

export function useProduct(id) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return { data, error, isPending, isError };
}
