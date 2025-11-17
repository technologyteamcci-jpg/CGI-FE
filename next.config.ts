import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // or swcMinify: true
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;