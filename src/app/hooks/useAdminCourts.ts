import { useQuery } from "@tanstack/react-query";

import { courtAdminService } from "@app/services/courtAdminService";

export function useAdminCourts() {
  const { data, isFetching } = useQuery({
    queryKey: ['courtAdmin', 'getAll'],
    queryFn: courtAdminService.getAll,
    staleTime: Infinity,
  });

  return { courts: data ?? [], isFetching };
}
