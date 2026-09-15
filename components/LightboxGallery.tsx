"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function LightboxGallery({ images, label }: { images: GalleryImage[]; label: string }) {
  const [openIndex, setOpenIndex] = useState(-1);

  if (!images.length) return null;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,0.5fr)]">
        {images.slice(0, 3).map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className={`group relative min-h-36 overflow-hidden rounded-2xl bg-pine text-left sm:min-h-0 ${images.length === 1 ? "aspect-[4/3] sm:col-span-2" : index === 0 ? "aspect-[4/3] sm:row-span-2 sm:aspect-auto" : "aspect-[4/2.1]"}`}
            aria-label={`Buka galeri ${label}, gambar ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload={index === 0}
              sizes={index === 0 ? "(max-width: 640px) 100vw, 60vw" : "(max-width: 640px) 100vw, 20vw"}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-pine/80 px-3 py-2 text-center text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
              Lihat foto
            </span>
          </button>
        ))}
      </div>
      <Lightbox
        open={openIndex >= 0}
        close={() => setOpenIndex(-1)}
        index={Math.max(openIndex, 0)}
        slides={images}
      />
    </div>
  );
}
