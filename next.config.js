/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "media.rawg.io",
        port: "",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
