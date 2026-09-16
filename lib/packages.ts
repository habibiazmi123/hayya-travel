export type RoomPrice = { label: string; price: number };

export type PackageInfo = {
  slug: string;
  name: string;
  dateLabel: string;
  durationLabel: string;
  departureCity?: string;
  airline?: string;
  seatLabel?: string;
  priceFrom: number;
  image: string;
  gallery?: { src: string; alt: string; width: number; height: number }[];
  schedule: string[];
  hotels?: { makkah: string; madinah: string };
  roomPrices?: RoomPrice[];
  included?: string[];
  excluded?: string[];
  notes?: string[];
};

export const PACKAGES: PackageInfo[] = [
  {
    slug: "umrah-special-akhir-tahun-24-des-2026",
    name: "Umrah Special Akhir Tahun 24 Desember 2026",
    dateLabel: "24 Desember 2026",
    durationLabel: "9 Hari",
    departureCity: "Jakarta",
    airline: "Garuda Indonesia",
    seatLabel: "5 seat",
    priceFrom: 35900000,
    image: "/package-1.jpg",
    gallery: [{ src: "/package-1.jpg", alt: "Suasana perjalanan umroh", width: 1160, height: 1452 }],
    schedule: ["Tanggal: 24 Desember 2026", "Periode: 9 Hari", "Keberangkatan: Jakarta"],
    hotels: {
      makkah: "Hotel bintang 3 / setaraf",
      madinah: "Hotel bintang 3 / setaraf",
    },
    roomPrices: [
      { label: "Quad Room / sekamar berempat", price: 35900000 },
      { label: "Triple Room / sekamar bertiga", price: 37500000 },
      { label: "Double Room / sekamar berdua", price: 39900000 },
    ],
    included: ["Tiket pesawat PP", "Visa Umrah", "Akomodasi hotel", "Transportasi", "Makan 3x sehari", "Muthawif / pembimbing ibadah"],
    excluded: ["Pembuatan paspor", "Vaksin", "Keperluan pribadi"],
    notes: ["Seat terbatas", "Harga dapat berubah sewaktu-waktu"],
  },
  {
    slug: "umrah-falah-07-nov-2026",
    name: "Umrah Falah 07 November 2026",
    dateLabel: "07 November 2026",
    durationLabel: "9 Hari",
    airline: "Oman Air",
    seatLabel: "Terbatas",
    priceFrom: 38600000,
    image: "/package-2.jpg",
    gallery: [{ src: "/package-2.jpg", alt: "Suasana perjalanan umroh", width: 1080, height: 1528 }],
    schedule: ["Tanggal: 07 November 2026", "Periode: 9 Hari"],
    hotels: {
      makkah: "Hotel bintang 3 / setaraf",
      madinah: "Hotel bintang 3 / setaraf",
    },
    roomPrices: [
      { label: "Quad Room / sekamar berempat", price: 38600000 },
      { label: "Triple Room / sekamar bertiga", price: 40200000 },
      { label: "Double Room / sekamar berdua", price: 42500000 },
    ],
    included: ["Tiket pesawat PP", "Visa Umrah", "Akomodasi hotel", "Transportasi", "Makan 3x sehari", "Muthawif / pembimbing ibadah"],
    excluded: ["Pembuatan paspor", "Vaksin", "Keperluan pribadi"],
    notes: ["Seat terbatas", "Harga dapat berubah sewaktu-waktu"],
  },
  {
    slug: "umrah-berkah-08-okt-2026",
    name: "Umrah Berkah 08 Oktober 2026",
    dateLabel: "08 Oktober 2026",
    durationLabel: "12 Hari",
    departureCity: "Jakarta",
    airline: "Saudia Airlines",
    seatLabel: "Terbatas",
    priceFrom: 33850000,
    image: "/package-3.jpg",
    gallery: [{ src: "/package-3.jpg", alt: "Suasana perjalanan umroh", width: 1080, height: 1528 }],
    schedule: ["Tanggal: 08 Oktober 2026", "Periode: 12 Hari", "Keberangkatan: Jakarta", "Maskapai: Saudia Airlines"],
    hotels: {
      makkah: "Hotel bintang 3 (Fajr Badee 4) / setaraf (5 malam)",
      madinah: "Hotel bintang 3 (Anwar Al-Zahra) / setaraf (5 malam)",
    },
    roomPrices: [
      { label: "Quad Room / sekamar berempat", price: 33850000 },
      { label: "Triple Room / sekamar bertiga", price: 35500000 },
      { label: "Double Room / sekamar berdua", price: 37850000 },
    ],
    included: [
      "Tiket pesawat PP (Economy Class Seat)",
      "Visa Umrah",
      "Akomodasi hotel Mekah & Madinah",
      "Driver & transportasi",
      "Makan & minum (Full Board 3x sehari)",
      "Muthawif / Pembimbing ibadah profesional",
      "Air Zam-zam 5 liter per jamaah",
      "Asuransi perjalanan",
      "Perlengkapan umroh Rp. 1.500.000",
    ],
    excluded: [
      "Pembuatan paspor",
      "Vaksin meningitis & polio",
      "Tiket domestik / add on ke Bandara Soekarno-Hatta",
      "Keperluan pribadi",
    ],
    notes: ["Seat terbatas", "Program disusun untuk kenyamanan & kekhusyukan ibadah"],
  },
  {
    slug: "umroh-super-hizz-03-agu-2026",
    name: "Umroh Super Hizz 03 Agustus 2026",
    dateLabel: "03 Agustus 2026",
    durationLabel: "9 Hari",
    departureCity: "Jakarta",
    seatLabel: "Terbatas",
    priceFrom: 26900000,
    image: "/destinations/umrah-makkah.jpg",
    gallery: [{ src: "/destinations/umrah-makkah.jpg", alt: "Masjidil Haram di Mekkah", width: 1800, height: 2700 }],
    schedule: ["Tanggal: 03 Agustus 2026", "Periode: 9 Hari", "Keberangkatan: Jakarta"],
    hotels: {
      makkah: "Hotel bintang 3 / setaraf",
      madinah: "Hotel bintang 3 / setaraf",
    },
    roomPrices: [
      { label: "Quad Room / sekamar berempat", price: 26900000 },
      { label: "Triple Room / sekamar bertiga", price: 28500000 },
      { label: "Double Room / sekamar berdua", price: 30900000 },
    ],
    included: ["Tiket pesawat PP", "Visa Umrah", "Akomodasi hotel", "Transportasi", "Makan 3x sehari", "Muthawif / pembimbing ibadah"],
    excluded: ["Pembuatan paspor", "Vaksin", "Keperluan pribadi"],
    notes: ["Seat terbatas", "Harga dapat berubah sewaktu-waktu"],
  },
];

export function packageSlugs(): string[] {
  return PACKAGES.map((item) => item.slug);
}

export function getPackage(slug: string): PackageInfo | undefined {
  return PACKAGES.find((item) => item.slug === slug);
}
