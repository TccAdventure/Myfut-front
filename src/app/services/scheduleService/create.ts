import type { UUID } from "node:crypto";

import { httpClient } from "../httpClient";

export interface CreateScheduleBody {
  date: Date;
  courtId: UUID;
}

type CreateScheduleResponse = { id: string };

export async function create(body: CreateScheduleBody) {
  const { data } = await httpClient.post<CreateScheduleResponse>('/schedules', body);

  return data;
}
