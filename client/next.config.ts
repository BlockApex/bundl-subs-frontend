import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.ctfassets.net", // Netflix, etc.
      "cdn-icons-png.flaticon.com", // in case you use icons
      "upload.wikimedia.org", // common fallback
      "res.cloudinary.com", // if you ever use Cloudinary
    ],
  },
};

export default nextConfig;
