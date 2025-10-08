import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { localStorageKeys } from "@app/config/localStorageKeys";
import { availableCities, type AvailableCities } from "@app/constants/availableCities";
import { useAuth } from "@app/hooks/useAuth";
import { useGetCourtsByCity } from "@app/hooks/useGetCourtsByCity";
import { routes } from "@app/Router/routes";

export function useHomeController() {
  const [selectedCity, setSelectedCity] = useState<AvailableCities | undefined>(() => {
    const storedSelectedCity = localStorage.getItem(localStorageKeys.SELECTED_CITY);

    return storedSelectedCity as AvailableCities | undefined;
  });

  const { user } = useAuth();
  const navigate = useNavigate();
  const { courts, isFetching } = useGetCourtsByCity({ city: selectedCity });

  const availableCitiesOptions = useMemo(() => {
    return availableCities.map((city) => ({
      value: city,
      label: city,
    }));
  }, []);

  function goToProfile() {
    navigate(routes.profile);
  }

  function goToCourtDetails(courtId: string) {
    navigate(`${routes.courtDetails}/${courtId}`);
  }

  function handleCityChange(city: AvailableCities) {
    localStorage.setItem(localStorageKeys.SELECTED_CITY, city);

    setSelectedCity(city);
  }

  useEffect(() => {
    if (user?.role === 'COURT_ADMIN') {
      navigate(routes.courtAdminHome, { replace: true });
    }
  }, [navigate, user?.role])

  return {
    courts,
    isFetching,
    availableCitiesOptions,
    selectedCity,
    goToProfile,
    goToCourtDetails,
    handleCityChange,
  }
}
