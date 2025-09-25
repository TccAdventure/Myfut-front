import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { routes } from "@app/Router/routes";
import { courtAdminService } from "@app/services/courtAdminService";

export function useCourtAdminHomeController() {
  const navigate = useNavigate();

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['courtAdmin', 'getAll'],
    queryFn: courtAdminService.getAll,
    staleTime: Infinity,
  });

  function handleCreateCourt() {
    navigate(routes.createCourt);
  }

  function goToProfile() {
    navigate(routes.profile);
  }

  function goToCourtDetails(courtId: string) {
    navigate(`${routes.createCourt}/${courtId}`);
  }

  return {
    courts: data,
    isFetching,
    isSuccess,
    isError,
    handleCreateCourt,
    goToProfile,
    goToCourtDetails,
  }
}
