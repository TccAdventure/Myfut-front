import type { CourtDetails } from "@app/entities/Court";
import { httpClient } from "../httpClient";

export type UpdateCourtBody = Partial<CourtDetails>;

type UpdateCourtResponse = { id: string };

export async function update(courtId: string, body: UpdateCourtBody) {
  const { data } = await httpClient.patch<UpdateCourtResponse>(`/courts/${courtId}`, body);

  return data;
}
