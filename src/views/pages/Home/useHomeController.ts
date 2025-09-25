import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@app/hooks/useAuth";
import { routes } from "@app/Router/routes";
import { courtAdminService } from "@app/services/courtAdminService";

export function useHomeController() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['court', 'getByCity'],
    queryFn: courtAdminService.getAll,
    staleTime: Infinity,
    enabled: false,
  });

  function goToProfile() {
    navigate(routes.profile);
  }

  useEffect(() => {
    if (user?.role === 'COURT_ADMIN') {
      navigate(routes.courtAdminHome, { replace: true });
    }
  }, [navigate, user?.role])

  return {
    courts: data,
    isFetching,
    isSuccess,
    isError,
    goToProfile,
  }
}
