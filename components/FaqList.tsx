import type { FaqItem } from "@/lib/content";

export function FaqList({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return <p className="text-sm text-sage">Belum ada pertanyaan. Silakan chat WhatsApp untuk informasi terbaru.</p>;

  return (
    <div className="divide-y divide-[#eee8dc] rounded-2xl bg-white px-5">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold text-pine marker:hidden">
            {item.question}
            <span aria-hidden="true" className="text-xl font-normal text-gold transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sage">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
