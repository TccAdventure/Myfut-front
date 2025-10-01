import { useQuery } from "@tanstack/react-query";

import { courtService } from "@app/services/courtService";

export function useGetCourtsByCity() {
  const { data, isFetching } = useQuery({
    queryKey: ['court', 'getByCity'],
    queryFn: async () => {
      return await courtService.getByCity("São Paulo");
    },
    staleTime: Infinity,
  });

  return { courts: data ?? [], isFetching };
}
