import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe as updateMeApi } from "../../services/apiUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: updateMeApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
  });

  return { updateUser, isPending, error, isError };
}
