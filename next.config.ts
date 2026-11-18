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
