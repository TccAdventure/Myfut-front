import type { Court } from "@app/entities/Court";
import { httpClient } from "../httpClient";

type CourtsResponse = Court[];

export async function getAll() {
  const { data } = await httpClient.get<CourtsResponse>('/courts');

  return data;
}
