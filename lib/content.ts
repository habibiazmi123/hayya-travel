export type EditorialItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  dateLabel?: string;
};

export type FaqItem = { question: string; answer: string };
export type GalleryItem = { src: string; alt: string; width: number; height: number };
export type ItineraryItem = { title: string; description: string };
export type TourCategory = "Religi" | "Asia" | "Eropa" | "Open Trip";

export type Tour = EditorialItem & {
  category: TourCategory;
  duration: string;
  route: string;
  highlights: string[];
  itinerary: ItineraryItem[];
  included: string[];
  priceLabel: string;
  gallery: GalleryItem[];
};

const destinationImage = (src: string, alt: string): GalleryItem[] => [{ src, alt, width: 1800, height: 1200 }];

export const TOURS: Tour[] = [
  {
    slug: "paket-umrah-wedding",
    title: "Umrah Wedding",
    excerpt: "Rangkaian ibadah umroh untuk pasangan yang ingin mengawali rumah tangga dengan perjalanan penuh makna.",
    image: "/destinations/umrah-makkah.jpg",
    category: "Religi",
    duration: "Sesuai program",
    route: "Mekkah - Madinah",
    highlights: ["Pendampingan ibadah untuk pasangan", "Momen doa bersama di Tanah Suci", "Rangkaian perjalanan yang lebih personal"],
    itinerary: [
      { title: "Persiapan dan keberangkatan", description: "Tim Hayya membantu checklist dokumen, perlengkapan, dan briefing sebelum keberangkatan." },
      { title: "Ibadah di Mekkah dan Madinah", description: "Jamaah menjalankan rangkaian ibadah dengan pendampingan dan waktu ziarah sesuai program." },
    ],
    included: ["Konsultasi persiapan perjalanan", "Pendampingan tim selama program", "Rincian fasilitas mengikuti paket yang dipilih"],
    priceLabel: "Harga sesuai tanggal",
    gallery: destinationImage("/destinations/umrah-makkah.jpg", "Suasana Masjidil Haram di Mekkah"),
  },
  {
    slug: "turki-super-hitzz-10d7n",
    title: "Turki Super Hitzz 10D7N",
    excerpt: "Jelajah Turki dari lanskap Cappadocia hingga pesona kota Istanbul dalam perjalanan budaya yang beragam.",
    image: "/destinations/turki.jpg",
    category: "Asia",
    duration: "10 hari 7 malam",
    route: "Istanbul - Cappadocia - kota pilihan",
    highlights: ["Eksplorasi sejarah Istanbul", "Lanskap unik Cappadocia", "Kuliner dan budaya lokal Turki"],
    itinerary: [
      { title: "Istanbul", description: "Mengenal kawasan bersejarah, masjid, dan pusat budaya yang mempertemukan dua benua." },
      { title: "Cappadocia dan sekitarnya", description: "Menikmati lanskap lembah batu, kota tua, dan pengalaman lokal sesuai susunan program." },
      { title: "Kepulangan", description: "Waktu bebas dan persiapan perjalanan pulang mengikuti jadwal penerbangan." },
    ],
    included: ["Akomodasi sesuai program", "Transportasi selama tour", "Pendampingan tour leader sesuai keberangkatan"],
    priceLabel: "Harga sesuai tanggal",
    gallery: destinationImage("/destinations/turki.jpg", "Pemandangan kota Istanbul di Turki"),
  },
  {
    slug: "open-trip-3-negara",
    title: "Open Trip 3 Negara",
    excerpt: "Satu perjalanan dengan tiga karakter destinasi: budaya, kuliner, dan pengalaman baru dalam satu rute.",
    image: "/destinations/open-trip-asia.jpg",
    category: "Open Trip",
    duration: "Sesuai program",
    route: "Tiga negara Asia sesuai keberangkatan",
    highlights: ["Rute lintas negara yang praktis", "Cocok untuk first-time traveler", "Kesempatan bertemu sesama peserta"],
    itinerary: [
      { title: "Negara pertama", description: "Memulai perjalanan dari kota pembuka dengan orientasi, kuliner, dan atraksi utama." },
      { title: "Negara kedua dan ketiga", description: "Melanjutkan rute lintas negara dengan jadwal transportasi dan aktivitas sesuai program." },
    ],
    included: ["Akomodasi sesuai program", "Transportasi rute utama", "Itinerary dan briefing sebelum berangkat"],
    priceLabel: "Harga sesuai tanggal",
    gallery: destinationImage("/destinations/open-trip-asia.jpg", "Pemandangan wisata Asia untuk open trip"),
  },
  {
    slug: "jepang-tokyo-kyoto-osaka-nara",
    title: "Jepang: Tokyo, Kyoto, Osaka, Nara",
    excerpt: "Perjalanan Jepang dengan perpaduan kota modern, kuil bersejarah, kuliner, dan suasana musim yang khas.",
    image: "/destinations/jepang.jpg",
    category: "Asia",
    duration: "Sesuai program",
    route: "Tokyo - Kyoto - Osaka - Nara",
    highlights: ["Kota modern Tokyo", "Kuil dan suasana tradisional Kyoto", "Kuliner Osaka dan taman bersejarah Nara"],
    itinerary: [
      { title: "Tokyo", description: "Menjelajahi kawasan kota modern, pusat belanja, dan landmark populer sesuai jadwal." },
      { title: "Kyoto dan Nara", description: "Menyusuri kuil, taman, dan kawasan tradisional yang menjadi wajah klasik Jepang." },
      { title: "Osaka", description: "Menutup perjalanan dengan suasana kota yang hidup dan pilihan kuliner lokal." },
    ],
    included: ["Akomodasi sesuai program", "Transportasi antarkota sesuai itinerary", "Pendampingan dan briefing perjalanan"],
    priceLabel: "Harga sesuai tanggal",
    gallery: destinationImage("/destinations/jepang.jpg", "Jalan tradisional di Kyoto, Jepang"),
  },
  {
    slug: "china-chongqing-chengdu",
    title: "China: Chongqing dan Chengdu",
    excerpt: "Mengenal kota-kota China yang dinamis melalui kuliner khas, arsitektur kota, dan pengalaman lokal.",
    image: "/destinations/china.jpg",
    category: "Asia",
    duration: "Sesuai program",
    route: "Chongqing - Chengdu",
    highlights: ["Panorama kota Chongqing", "Budaya dan kuliner Sichuan", "Ritme kota modern China"],
    itinerary: [
      { title: "Chongqing", description: "Menikmati lanskap kota bertingkat, kawasan malam, dan titik foto yang menjadi ciri khas Chongqing." },
      { title: "Chengdu", description: "Menjelajahi budaya lokal, kuliner Sichuan, dan ruang publik yang santai sesuai program." },
    ],
    included: ["Akomodasi sesuai program", "Transportasi rute utama", "Informasi persiapan visa dan dokumen melalui tim Hayya"],
    priceLabel: "Harga sesuai tanggal",
    gallery: destinationImage("/destinations/china.jpg", "Pemandangan kota di China"),
  },
  {
    slug: "eropa-balkan-multi-negara",
    title: "Eropa Balkan Multi-Negara",
    excerpt: "Rute lintas Balkan dengan kota tua, danau, pegunungan, dan jejak sejarah Eropa Tenggara.",
    image: "/destinations/eropa-balkan.jpg",
    category: "Eropa",
    duration: "Sesuai program",
    route: "Balkan sesuai keberangkatan",
    highlights: ["Kota tua dan arsitektur bersejarah", "Bentang alam Balkan", "Pengalaman lintas budaya dalam satu rute"],
    itinerary: [
      { title: "Kota pembuka", description: "Memulai perjalanan dengan orientasi kota dan kunjungan ke landmark utama." },
      { title: "Rute lintas Balkan", description: "Berpindah antarkota untuk menikmati sejarah, alam, dan suasana lokal sesuai susunan itinerary." },
    ],
    included: ["Akomodasi sesuai program", "Transportasi antarkota sesuai itinerary", "Pendampingan tour leader sesuai keberangkatan"],
    priceLabel: "Harga sesuai tanggal",
    gallery: destinationImage("/destinations/eropa-balkan.jpg", "Pemandangan danau di kawasan Balkan"),
  },
  {
    slug: "eropa-barat-kota-utama",
    title: "Eropa Barat Kota Utama",
    excerpt: "Jelajah kota-kota utama Eropa Barat dengan perpaduan landmark ikonik, museum, belanja, dan kuliner.",
    image: "/destinations/eropa-barat.jpg",
    category: "Eropa",
    duration: "Sesuai program",
    route: "Paris dan kota utama sesuai program",
    highlights: ["Landmark kota yang ikonik", "Jejak seni dan sejarah Eropa", "Waktu bebas untuk kuliner dan belanja"],
    itinerary: [
      { title: "Paris", description: "Menikmati landmark, boulevard, dan kawasan bersejarah Paris sesuai jadwal perjalanan." },
      { title: "Kota lanjutan", description: "Melanjutkan perjalanan menuju kota-kota pilihan dengan rute dan fasilitas yang dikonfirmasi sebelum berangkat." },
    ],
    included: ["Akomodasi sesuai program", "Transportasi rute utama", "Konsultasi persiapan dokumen perjalanan"],
    priceLabel: "Harga sesuai tanggal",
    gallery: destinationImage("/destinations/eropa-barat.jpg", "Menara Eiffel di Paris, Prancis"),
  },
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
export function getTour(slug: string): Tour | undefined { return TOURS.find((item) => item.slug === slug); }
export function articleSlugs(): string[] { return ARTICLES.map((item) => item.slug); }
export function getArticle(slug: string): EditorialItem | undefined { return ARTICLES.find((item) => item.slug === slug); }
