import { httpClient } from "../httpClient";

export async function remove(courtId: string) {
  const { data } = await httpClient.delete(`/courts/${courtId}`);

  return data;
}
