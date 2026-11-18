import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/tools/jap-mala",
        destination: "/tools/108-jap-mala-counter",
        permanent: true,
      },
      {
        source: "/tools/shankh-dhwani",
        destination: "/tools/digital-temple-bell",
        permanent: true,
      },
      {
        source: "/tools/punya-khata",
        destination: "/tools/daily-punya-ledger",
        permanent: true,
      },
      {
        source: "/tools/om-dhyan",
        destination: "/meditation",
        permanent: true,
      },
      {
        source: "/aarti/jai-ganesh-deva",
        destination: "/aarti/jai-ganesh-jai-ganesh-deva",
        permanent: true,
      },
      {
        source: "/tools/baby-names",
        destination: "/tools/hindu-baby-names",
        permanent: true,
      },
      {
        source: "/encyclopedia/chatur-vedas-overview",
        destination: "/encyclopedia/chatur-vedas",
        permanent: true,
      },
      {
        source: "/encyclopedia/char-yuga-chronology",
        destination: "/encyclopedia/char-yuga",
        permanent: true,
      },
      {
        source: "/encyclopedia/dwadash-jyotirlinga-knowledge",
        destination: "/encyclopedia/dwadash-jyotirlinga",
        permanent: true,
      },
      {
        source: "/encyclopedia/51-shakti-peethas-significance",
        destination: "/encyclopedia/51-shaktipeeth",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
