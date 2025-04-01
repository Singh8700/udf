/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/udf',
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
