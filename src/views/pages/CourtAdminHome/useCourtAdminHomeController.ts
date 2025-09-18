import { useAuth } from "@app/hooks/useAuth";
import { routes } from "@app/Router/routes";
import { courtAdminService } from "@app/services/courtAdminService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCourtAdminHomeController() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const { isError, isFetching, isSuccess, data } = useQuery({
      queryKey: ['court', 'getAll'],
      queryFn: () => courtAdminService.getAll(),
      staleTime: Infinity,
    });

  function handleLogout() {
    signout();
  }

  function handleCreateCourt() {
    navigate(routes.createCourt);
  }

  return {
    courts: data,
    isFetching,
    isSuccess,
    isError,
    handleLogout,
    handleCreateCourt,
  }
}
