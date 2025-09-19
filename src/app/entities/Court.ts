import type { UUID } from "node:crypto";

export interface Court {
  id: UUID;
  userId: UUID;
  name: string;
  description: string;
  imageUrl?: string | null;
  linkToGoogleMaps?: string | null;
}

export interface CourtDetails extends Court {
  courtAddress: {
    id: string;
    courtId: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: number;
    complement: string | null;
  };
  courtAvailability: {
    id: string;
    courtId: string;
    weekday: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
  }[];
}
