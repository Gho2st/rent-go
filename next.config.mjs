/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "rent-go.s3.eu-central-1.amazonaws.com",
      "platform-lookaside.fbsbx.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
