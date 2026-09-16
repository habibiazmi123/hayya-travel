"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LoadingImage } from "@/components/LoadingImage";
import type { GalleryCategory, GalleryItem } from "@/lib/content";

type GalleryFilter = "Semua" | GalleryCategory;
const filters: GalleryFilter[] = ["Semua", "Umroh", "Wisata", "Kebersamaan"];

export function GalleryGrid({ items, compact = false }: { items: GalleryItem[]; compact?: boolean }) {
  const [selectedFilter, setSelectedFilter] = useState<GalleryFilter>("Semua");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const visibleItems = useMemo(
    () => selectedFilter === "Semua" ? items : items.filter((item) => item.category === selectedFilter),
    [items, selectedFilter],
  );
  const desktopColumns = [0, 1, 2].map((column) => visibleItems.filter((_, itemIndex) => itemIndex % 3 === column));
  const mobileColumns = [0, 1].map((column) => visibleItems.filter((_, itemIndex) => itemIndex % 2 === column));
  const slides = visibleItems.map((item) => ({ src: item.src, alt: item.alt, width: item.width, height: item.height }));

  const renderCard = (item: GalleryItem, itemIndex: number) => (
    <button
      key={`${item.src}-${itemIndex}`}
      type="button"
      onClick={() => { setIndex(itemIndex); setOpen(true); }}
      aria-label={`Lihat foto ${item.location}, ${item.area}`}
      className={`gallery-pin gallery-pin-${item.aspect} group text-left`}
    >
      <LoadingImage src={item.src} alt={item.alt} fill loading={!compact && itemIndex < 3 ? "eager" : "lazy"} sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
      <span className="gallery-caption">
        <strong>{item.location}</strong>
        <span>{item.area}</span>
      </span>
    </button>
  );

  if (!items.length) return <p className="mt-10 text-center text-sage">Galeri sedang diperbarui.</p>;

  return (
    <div className={compact ? "" : "mt-10"}>
      <div className="mb-6 flex flex-wrap justify-center gap-2" aria-label="Filter dokumentasi">
        {filters.map((filter) => (
          <button key={filter} type="button" aria-pressed={selectedFilter === filter} onClick={() => { setSelectedFilter(filter); setIndex(0); }} className={`inline-flex min-h-10 items-center rounded-full border px-4 text-xs font-bold transition-colors ${selectedFilter === filter ? "border-pine bg-pine text-white" : "border-[#dcd1bc] text-sage hover:border-pine hover:text-pine"}`}>
            {filter}
          </button>
        ))}
      </div>
      {visibleItems.length ? (
        <>
          <div className="gallery-masonry gallery-masonry-desktop">
            {desktopColumns.map((column, columnIndex) => <div key={`desktop-${columnIndex}`} className={`gallery-column gallery-column-offset-${columnIndex + 1}`}>{column.map((item) => renderCard(item, visibleItems.indexOf(item)))}</div>)}
          </div>
          <div className="gallery-masonry gallery-masonry-mobile">
            {mobileColumns.map((column, columnIndex) => <div key={`mobile-${columnIndex}`} className={`gallery-column gallery-column-offset-${columnIndex + 1}`}>{column.map((item) => renderCard(item, visibleItems.indexOf(item)))}</div>)}
          </div>
        </>
      ) : (
        <div role="status" className="rounded-2xl border border-dashed border-[#dcd1bc] px-5 py-12 text-center text-sm text-sage">
          <p>Tidak ada dokumentasi pada kategori ini.</p>
          <button type="button" onClick={() => setSelectedFilter("Semua")} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-pine px-5 font-bold text-white">Reset filter</button>
        </div>
      )}
      <Lightbox open={open} close={() => setOpen(false)} index={index} slides={slides} />
    </div>
  );
}
