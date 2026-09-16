"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { generalWaLink } from "@/lib/whatsapp";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const sentinel = document.querySelector<HTMLElement>("[data-home-hero-sentinel]");
    if (!sentinel) return;

    let frame = 0;
    const update = () => {
      const top = sentinel.getBoundingClientRect().top;
      const range = Math.max(window.innerHeight - 80, 1);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - top) / range));
      headerRef.current?.style.setProperty("--header-progress", progress.toFixed(3));
      setIsOverHero(progress >= 1);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  return (
    <header ref={headerRef} className={`site-header ${isHome ? "site-header-home" : ""} ${isHome && !isOverHero ? "site-header-transparent" : "site-header-solid"}`}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-5 px-4">
        <Link href="/" className="inline-flex min-h-11 items-center" aria-label="Hayya Tour & Travel - Beranda">
          <Image src="/logo.png" alt="Hayya Umroh Hajj" width={112} height={68} preload className="h-14 w-auto object-contain" />
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-5 lg:flex">
          {SITE.nav.map((item) => (
              <Link key={item.href} href={item.href} className={`inline-flex min-h-11 items-center text-sm font-semibold transition-colors hover:text-gold-soft ${isHome && !isOverHero ? "text-white/85" : "text-ink/75"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center rounded-full bg-pine px-4 text-sm font-bold text-white transition-colors hover:bg-pine-deep sm:inline-flex">
            WhatsApp Kami
          </a>
          <button type="button" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? "Tutup menu" : "Buka menu"} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5dfd2] text-pine lg:hidden">
            <span className="sr-only">{isOpen ? "Tutup menu" : "Buka menu"}</span>
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {isOpen ? (
        <nav id="mobile-menu" aria-label="Navigasi seluler" className="border-t border-[#eee8dc] bg-white px-4 py-3 lg:hidden">
          {SITE.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="flex min-h-11 items-center border-b border-[#f3eee3] text-sm font-semibold text-pine last:border-0">
              {item.label}
            </Link>
          ))}
          <a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-pine text-sm font-bold text-white">
            WhatsApp Kami
          </a>
        </nav>
      ) : null}
    </header>
  );
}
