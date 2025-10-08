export const availableCities = ["Bauru", "Agudos", "Arealva"] as const;

export type AvailableCities = typeof availableCities[number];
