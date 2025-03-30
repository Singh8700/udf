/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/udf',
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
