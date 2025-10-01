import { useQuery } from "@tanstack/react-query";

import { courtAdminService } from "@app/services/courtAdminService";

export function useGetCourtById(courtId: string) {
  const { data, isFetching } = useQuery({
    queryKey: ["courts", courtId],
    queryFn: async () => {
      return await courtAdminService.getById(courtId);
    },
    staleTime: Infinity,
  });

  return { court: data, isFetching };
}
