import { SITE } from "@/lib/site";

export function waLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generalWaLink(): string {
  return waLink(
    SITE.phoneIntl,
    "Assalamu'alaikum Hayya Tour & Travel, saya ingin konsultasi paket umroh."
  );
}

export function packageWaLink(packageInfo: { name: string; priceFrom: number }): string {
  return waLink(
    SITE.phoneIntl,
    `Assalamu'alaikum Hayya Tour & Travel, saya tertarik dengan paket ${packageInfo.name} mulai ${packageInfo.priceFrom.toLocaleString("id-ID")}. Mohon info jadwal dan ketersediaan seat.`
  );
}
