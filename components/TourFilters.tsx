"use client";

import { useState } from "react";
import { EditorialCard } from "@/components/EditorialCard";
import type { Tour, TourCategory } from "@/lib/content";

const ALL_CATEGORIES = "Semua" as const;

export function TourFilters({ tours }: { tours: Tour[] }) {
  const [selectedCategory, setSelectedCategory] = useState<typeof ALL_CATEGORIES | TourCategory>(ALL_CATEGORIES);
  const categories = Array.from(new Set(tours.map((tour) => tour.category))) as TourCategory[];
  const visibleTours = selectedCategory === ALL_CATEGORIES ? tours : tours.filter((tour) => tour.category === selectedCategory);

  const categoryButton = (category: typeof ALL_CATEGORIES | TourCategory, mobile = false) => {
    const active = selectedCategory === category;
    return (
      <button
        key={category}
        type="button"
        aria-pressed={active}
        onClick={() => setSelectedCategory(category)}
        className={mobile
          ? `shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition-colors ${active ? "border-pine bg-pine text-white" : "border-[#e5dfd2] bg-white text-pine hover:border-pine"}`
          : `flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-bold transition-colors ${active ? "bg-pine text-white" : "text-sage hover:bg-[#f4efe6] hover:text-pine"}`}
      >
        {category}
      </button>
    );
  };

  return (
    <div className="mt-10">
      <div className="sticky top-20 z-20 -mx-4 border-y border-[#eee8dc] bg-sand/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter kategori wisata">
          {[ALL_CATEGORIES, ...categories].map((category) => categoryButton(category, true))}
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
        <aside className="hidden rounded-2xl border border-[#eee8dc] bg-white p-3 md:block">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#A67C2E]">Kategori</p>
          <div className="space-y-1" aria-label="Filter kategori wisata">
            {[ALL_CATEGORIES, ...categories].map((category) => categoryButton(category))}
          </div>
        </aside>
        <div>
          <p className="mb-5 text-sm text-sage" aria-live="polite">Menampilkan {visibleTours.length} program wisata</p>
          {visibleTours.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleTours.map((tour, index) => <EditorialCard key={tour.slug} href={`/wisata/${tour.slug}`} title={tour.title} excerpt={tour.excerpt} image={tour.image} meta={`${tour.route} · ${tour.duration}`} category={tour.category} priceLabel={tour.priceLabel} preload={index === 0} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d8ccb9] bg-white p-8 text-center">
              <p className="font-bold text-pine">Belum ada program di kategori ini.</p>
              <button type="button" onClick={() => setSelectedCategory(ALL_CATEGORIES)} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-gold px-5 text-sm font-bold text-pine">Tampilkan semua</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
