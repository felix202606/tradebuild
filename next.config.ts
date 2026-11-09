import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compiler: { styledComponents: true },
  redirects: async () => [
    { source: "/cms", destination: "/studio", permanent: false },
    { source: "/admin", destination: "/studio", permanent: false },
  ],
};

export default nextConfig;
