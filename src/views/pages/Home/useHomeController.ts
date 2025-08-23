import { useAuth } from "@app/hooks/useAuth";
import { courtAdminService } from "@app/services/courtAdminService";
import { useQuery } from "@tanstack/react-query";

export function useHomeController() {
  const { signout } = useAuth();

  const { isError, isFetching, isSuccess, data,  } = useQuery({
      queryKey: ['court', 'getAll'],
      queryFn: () => courtAdminService.getAll(),
      staleTime: Infinity,
    });

  function handleLogout() {
    signout();
  }

  return {
    courts: data,
    isFetching,
    isSuccess,
    isError,
    handleLogout,
  }
}