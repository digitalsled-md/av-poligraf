export const SERVICE_IDS = [
  "business-cards",
  "banners",
  "flyers",
  "design",
  "laminating",
  "canvas",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export function isValidServiceId(id: string): id is ServiceId {
  return (SERVICE_IDS as readonly string[]).includes(id);
}
