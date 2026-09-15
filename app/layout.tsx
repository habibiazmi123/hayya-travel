import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/site";

const display = Cormorant_Garamond({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hayyatourtravel.co.id"),
  title: "Hayya Tour & Travel | Umroh Amanah dari Bandung",
  description:
    "Paket umroh Hayya Tour & Travel dengan proses cepat, muthawif berpengalaman, dan pelayanan amanah.",
  applicationName: "Hayya Tour & Travel",
  keywords: ["travel umroh Bandung", "paket umroh 2026", "Hayya Umroh Hajj", "umroh amanah"],
  authors: [{ name: "Hayya Tour & Travel" }],
  creator: "Hayya Tour & Travel",
  publisher: "PT Hayya Haramain Global",
  icons: { icon: "/icon.png", apple: "/icon.png" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Hayya Tour & Travel",
    title: "Hayya Tour & Travel | Umroh Amanah dari Bandung",
    description: "Paket umroh 2026 dengan proses cepat, muthawif berpengalaman, dan pelayanan amanah.",
    images: [{ url: "/logo.png", width: 433, height: 259, alt: "Logo Hayya Umroh Hajj" }],
  },
  twitter: {
    card: "summary",
    title: "Hayya Tour & Travel | Umroh Amanah dari Bandung",
    description: "Paket umroh 2026 dengan proses cepat dan pelayanan amanah.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    legalName: SITE.legalName,
    url: "https://hayyatourtravel.co.id",
    logo: "https://hayyatourtravel.co.id/logo.png",
    telephone: `+${SITE.phoneIntl}`,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    sameAs: SITE.socials.map((social) => social.href),
  };

  return (
    <html lang="id" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-sand text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
