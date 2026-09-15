import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about", destination: "/tentang", permanent: true },
      { source: "/berita_post", destination: "/berita", permanent: true },
      { source: "/berita_post/:path*", destination: "/berita", permanent: true },
      { source: "/wisata_post", destination: "/wisata", permanent: true },
      { source: "/wisata_post/detail_wisata/:id", destination: "/wisata", permanent: true },
      { source: "/paket/detail_paket/:id", destination: "/paket", permanent: true },
      { source: "/detail_photo/galeri", destination: "/galeri", permanent: true },
      { source: "/semua_album", destination: "/galeri", permanent: true },
    ];
  },
};

export default nextConfig;
