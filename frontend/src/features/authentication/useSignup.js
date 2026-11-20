import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    error,
    data,
    isPending,
    isError,
    mutate: signup,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/");
    },
  });

  return { error, data, isError, isPending, signup };
}
