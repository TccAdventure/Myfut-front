import { httpClient } from "../httpClient";

export type UploadCourtImageData = {
  courtId: string,
  body: FormData,
};

export async function uploadFile({ courtId, body }: UploadCourtImageData) {
  const { data } = await httpClient.post(`/courts/${courtId}/upload`, body);

  return data;
}
