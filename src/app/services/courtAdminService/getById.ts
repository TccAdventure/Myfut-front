import type { CourtDetails } from "@app/entities/Court";
import { httpClient } from "../httpClient";

type CourtsResponse = CourtDetails;

export async function getById(courtId: string) {
  const { data } = await httpClient.get<CourtsResponse>(`/courts/${courtId}`);

  return data;
}
