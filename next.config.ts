import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/demo",
        destination: "https://demo.phpinfowp.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
