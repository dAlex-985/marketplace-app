import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";

export function useProducts() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { isPending, isError, data, error };
}
