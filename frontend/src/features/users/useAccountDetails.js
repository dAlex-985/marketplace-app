import { useQuery } from "@tanstack/react-query";
import { getMyAccountDetails } from "../../services/apiUser";

export function useAccountDetails() {
  const {
    error,
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryFn: getMyAccountDetails,
    queryKey: ["user"],
    retry: false,
  });

  return { error, user, isPending, isError };
}
