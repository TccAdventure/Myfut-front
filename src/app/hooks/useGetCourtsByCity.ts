import { useQuery } from "@tanstack/react-query";

import type { AvailableCities } from "@app/constants/availableCities";
import { courtService } from "@app/services/courtService";

interface IGetCourtsByCityParams {
  city?: AvailableCities
}

export function useGetCourtsByCity({ city }: IGetCourtsByCityParams) {
  const { data, isFetching } = useQuery({
    queryKey: ['court', 'getByCity', city],
    queryFn: async () => {
      if (!city) return null;

      return await courtService.getByCity(city);
    },
    staleTime: Infinity,
    enabled: !!city,
  });

  return { courts: data ?? [], isFetching };
}
