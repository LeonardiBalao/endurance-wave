/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
