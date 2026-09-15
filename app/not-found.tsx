import Link from "next/link";
import { generalWaLink } from "@/lib/whatsapp";

export default function NotFound() {
  return <div className="mx-auto max-w-2xl px-4 py-24 text-center"><p className="text-xs font-bold tracking-[0.18em] text-[#A67C2E]">HALAMAN TIDAK DITEMUKAN</p><h1 className="mt-3 font-display text-5xl font-bold text-pine">Alamat ini sudah berubah</h1><p className="mt-4 text-sage">Kembali ke paket umroh atau hubungi tim Hayya untuk mendapatkan bantuan.</p><div className="mt-7 flex justify-center gap-3"><Link href="/paket" className="inline-flex min-h-12 items-center rounded-full bg-pine px-6 font-bold text-white">Lihat Paket</Link><a href={generalWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-gold px-6 font-bold text-pine">WhatsApp</a></div></div>;
}
