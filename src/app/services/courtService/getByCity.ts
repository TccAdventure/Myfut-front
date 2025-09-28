import type { Court } from "@app/entities/Court";
import { httpClient } from "../httpClient";

type CourtsResponse = Court[];

export async function getByCity(city: string) {
  const { data } = await httpClient.get<CourtsResponse>(`/courts/cities/${city}`);

  return data;
}
