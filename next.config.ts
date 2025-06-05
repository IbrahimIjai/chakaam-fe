import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://pbs.twimg.com/**"),
      new URL("https://gateway.lighthouse.storage/ipfs/**"),
    ],
  },
};

export default nextConfig;
