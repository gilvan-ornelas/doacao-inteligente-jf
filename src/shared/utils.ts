import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function googleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function whatsappUrl(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function humanHoursAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  if (hours < 1) return "agora há pouco";
  if (hours === 1) return "há 1 hora";
  if (hours < 24) return `há ${hours} horas`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "há 1 dia";
  return `há ${days} dias`;
}
