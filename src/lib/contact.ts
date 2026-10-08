import { site } from "@/content/site";

const digits = (value: string) => value.replace(/\D/g, "");

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${digits(site.contact.whatsapp)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telUrl() {
  return `tel:+${digits(site.contact.phone)}`;
}

export function mailtoUrl() {
  return `mailto:${site.contact.email}`;
}
