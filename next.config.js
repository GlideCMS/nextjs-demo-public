/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "components/*"),
    ],
  },
  images: {
    domains: [],
  },
  compiler: {
    removeConsole: false,
  },
};

if (process.env.MEDIA_BASE_PATH) {
  nextConfig.images.domains.push(process.env.MEDIA_BASE_PATH);
  nextConfig.images.domains.push("media.sandbox-gc1.gcpp.io");
  nextConfig.images.domains.push("s3-eu-west-1.amazonaws.com");
}

module.exports = nextConfig;
