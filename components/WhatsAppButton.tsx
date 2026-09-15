import { generalWaLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp Hayya Tour & Travel" className="fixed bottom-4 right-4 z-30 inline-flex min-h-12 items-center rounded-full bg-[#25D366] px-5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:-translate-y-0.5">
      Chat WhatsApp
    </a>
  );
}
