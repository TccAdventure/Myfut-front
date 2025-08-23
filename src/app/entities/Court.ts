import type { UUID } from "node:crypto";

export interface Court {
  id: UUID;
  userId: UUID;
  name: string;
  description: string;
  imageUrl?: string | null;
  linkToGoogleMaps?: string | null;
}
