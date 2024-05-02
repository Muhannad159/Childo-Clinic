import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout as LogoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: Logout, isLoading } = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem("token");
      navigate("/HomePage", { replace: true });
    },
  });
  return { Logout, isLoading };
}
