import type { Status } from "@/shared/constants";

export function statusConfig(status: string) {
  switch (status as Status) {
    case "URGENTE":
      return {
        label: "URGENTE",
        colorClass: "bg-status-urgente/20 text-status-urgente border-status-urgente/30",
        dotClass: "bg-status-urgente",
        icon: "circle-alert" as const,
      };
    case "PRECISA":
      return {
        label: "PRECISA",
        colorClass: "bg-status-precisa/20 text-status-precisa border-status-precisa/30",
        dotClass: "bg-status-precisa",
        icon: "circle-dot" as const,
      };
    default:
      return {
        label: "OK",
        colorClass: "bg-status-ok/20 text-status-ok border-status-ok/30",
        dotClass: "bg-status-ok",
        icon: "circle-check" as const,
      };
  }
}

export function isWithinHours(isoDate: string, maxHours: number): boolean {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  return diffMs <= maxHours * 60 * 60 * 1000;
}
