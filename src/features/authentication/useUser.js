import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    isLoading,
    user,
    isAuthenticated:
      user?.role === "SUPERADMIN" ||
      user?.role === "ADMIN" ||
      user?.role === "DOCTOR" ||
      user?.role === "NURSE" ||
      user?.role === "USER",
  };
}
