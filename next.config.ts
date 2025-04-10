/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // 禁用ESLint检查
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
