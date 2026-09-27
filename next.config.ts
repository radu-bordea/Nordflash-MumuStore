import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "jcgvrkwcwllawmdghsfy.supabase.co",
        // Serve Supabase images directly, skipping Next's
        // fetch-resize-reencode pipeline, which is timing out.
      },
    ],
    unoptimized: false, // keep optimization for Pexels/Clerk images
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;