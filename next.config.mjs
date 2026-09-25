/** @type {import('next').NextConfig} */
const nextConfig = {
  // Type errors must fail the build: the portfolio ships recruiter-facing
  // content, so a broken window or link should never reach production.
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
