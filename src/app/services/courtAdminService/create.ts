import { httpClient } from "../httpClient";

export interface CreateCourtBody {
  name: string;
}

type CreateCourtResponse = { id: string };

export async function create(body: CreateCourtBody) {
  const { data } = await httpClient.post<CreateCourtResponse>('/courts', body);

  return data;
}
