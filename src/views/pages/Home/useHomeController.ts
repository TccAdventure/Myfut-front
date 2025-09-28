import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@app/hooks/useAuth";
import { useGetCourtsByCity } from "@app/hooks/useGetCourtsByCity";
import { routes } from "@app/Router/routes";

export function useHomeController() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { courts, isFetching } = useGetCourtsByCity();

  function goToProfile() {
    navigate(routes.profile);
  }

  function goToCourtDetails(courtId: string) {
    navigate(`${routes.courtDetails}/${courtId}`);
  }

  useEffect(() => {
    if (user?.role === 'COURT_ADMIN') {
      navigate(routes.courtAdminHome, { replace: true });
    }
  }, [navigate, user?.role])

  return {
    courts,
    isFetching,
    goToProfile,
    goToCourtDetails,
  }
}
