import { useNavigate } from "react-router-dom";

import { useAdminCourts } from "@app/hooks/useAdminCourts";
import { routes } from "@app/Router/routes";

export function useCourtAdminHomeController() {
  const navigate = useNavigate();
  const { courts, isFetching, } = useAdminCourts();

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
    courts,
    isFetching,
    handleCreateCourt,
    goToProfile,
    goToCourtDetails,
  }
}
