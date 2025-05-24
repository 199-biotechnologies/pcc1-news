/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['pcc1.news'],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
