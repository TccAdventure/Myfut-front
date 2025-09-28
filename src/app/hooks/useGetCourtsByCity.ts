import { courtService } from "@app/services/courtService";
import { useQuery } from "@tanstack/react-query";

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
