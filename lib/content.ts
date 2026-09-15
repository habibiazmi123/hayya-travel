export type EditorialItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  dateLabel?: string;
};

export type FaqItem = { question: string; answer: string };
export type GalleryItem = { src: string; alt: string; width: number; height: number };

export const TOURS: EditorialItem[] = [
  { slug: "paket-umrah-wedding", title: "PAKET UMRAH WEDDING", excerpt: "Informasi program tersedia dari tim Hayya.", image: "/gallery-1.jpg" },
  { slug: "turki-super-hitzz-10d7n", title: "TURKI SUPER HITZZ 10D7N", excerpt: "Informasi program tersedia dari tim Hayya.", image: "/gallery-2.jpg" },
  { slug: "open-trip-3-negara", title: "OPEN TRIP 3 NEGARA - 1 PERJALANAN, 3 PENGALAMAN", excerpt: "Informasi program tersedia dari tim Hayya.", image: "/gallery-3.jpg" },
];

export const ARTICLES: EditorialItem[] = [
  { slug: "waspada-penipuan-hayya", title: "PENGUMUMAN RESMI: WASPADA PENIPUAN MENGATASNAMAKAN PT HAYYA HARAMAIN GLOBAL", excerpt: "PT Hayya Haramain Global mengimbau calon jamaah, jamaah, Agent/Mitra, serta masyarakat untuk meningkatkan kewaspadaan terhadap penipuan.", dateLabel: "21 Agustus 2026", image: "/gallery-4.jpg" },
  { slug: "umroh-plus-jordan-aqsho-mesir-part-3", title: "Umroh Plus Jordan-Aqsho-Mesir (Part 3): Menelusuri Kemuliaan Sejarah Islam di Negeri Piramida", excerpt: "Setelah melintasi tanah Jordan dan bersujud di Masjidil Aqsha, perjalanan spiritual mencapai Mesir.", dateLabel: "16 Mei 2026", image: "/gallery-5.jpg" },
  { slug: "umroh-plus-jordan-aqsho-mesir-part-2", title: "Umroh Plus Jordan-Aqsho-Mesir (Part 2): Mengetuk Pintu Langit di Jerusalem & Hebron", excerpt: "Perjalanan suci berlanjut melintasi perbatasan menuju tanah Palestina.", dateLabel: "16 Mei 2026", image: "/gallery-6.jpg" },
  { slug: "umroh-plus-jordan-aqsho-mesir-part-1", title: "Umroh Plus Jordan-Aqsho-Mesir (Part 1): Menapak Tilas Mukjizat dan Jejak Suci Sahabat di Jordan", excerpt: "Perjalanan ibadah bukan sekadar berpindah tempat, melainkan menjemput hikmah di bumi Allah.", dateLabel: "07 April 2026", image: "/hero.jpg" },
];

export const FAQS: FaqItem[] = [
  { question: "Apa saja yang termasuk dalam harga paket?", answer: "Rincian setiap paket, termasuk tiket, visa, akomodasi, transportasi, konsumsi, dan pendampingan, tersedia di halaman detail paket jika telah dipublikasikan." },
  { question: "Bagaimana cara mendaftar?", answer: "Hubungi tim Hayya melalui WhatsApp. Tim kami akan membantu memilih paket, mengonfirmasi seat, dan menjelaskan dokumen yang diperlukan." },
  { question: "Apakah didampingi Muthawif?", answer: "Hayya mencantumkan Muthawif atau pembimbing ibadah profesional sebagai bagian dari layanan paket yang tersedia." },
  { question: "Berapa lama durasi perjalanan?", answer: "Durasi mengikuti paket yang dipilih. Paket yang sedang tersedia memiliki durasi 9 atau 12 hari." },
];

export const GALLERY: GalleryItem[] = [
  { src: "/gallery-1.jpg", alt: "Momen perjalanan jamaah Hayya", width: 400, height: 300 },
  { src: "/gallery-2.jpg", alt: "Kegiatan jamaah Hayya", width: 400, height: 300 },
  { src: "/gallery-3.jpg", alt: "Rombongan jamaah Hayya", width: 400, height: 300 },
  { src: "/gallery-4.jpg", alt: "Dokumentasi perjalanan Hayya", width: 400, height: 300 },
  { src: "/gallery-5.jpg", alt: "Suasana perjalanan jamaah", width: 400, height: 300 },
  { src: "/gallery-6.jpg", alt: "Momen kebersamaan jamaah", width: 400, height: 300 },
];

export function tourSlugs(): string[] { return TOURS.map((item) => item.slug); }
export function getTour(slug: string): EditorialItem | undefined { return TOURS.find((item) => item.slug === slug); }
export function articleSlugs(): string[] { return ARTICLES.map((item) => item.slug); }
export function getArticle(slug: string): EditorialItem | undefined { return ARTICLES.find((item) => item.slug === slug); }
