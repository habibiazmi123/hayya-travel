"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import type { GalleryItem } from "@/lib/content";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = items.map((item) => ({ src: item.src, alt: item.alt, width: item.width, height: item.height }));

  if (!items.length) return <p className="mt-10 text-center text-sage">Galeri sedang diperbarui.</p>;

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => { setIndex(i); setOpen(true); }}
            className="relative h-56 overflow-hidden rounded-2xl md:h-72"
          >
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform hover:scale-105" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-opacity hover:bg-black/20 hover:opacity-100">
              Lihat foto
            </span>
          </button>
        ))}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={index} slides={slides} />
    </>
  );
}
