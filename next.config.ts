import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  redirects: async () => [
    { source: "/cms", destination: "/studio", permanent: false },
    { source: "/admin", destination: "/studio", permanent: false },
  ],
};

export default nextConfig;
