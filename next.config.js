/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/udf',
  images: {
    unoptimized: true,
  },
  env: {
    API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://your-render-api-url.onrender.com'  // Replace with your Render.com URL after deploying
      : 'http://localhost:5000'
  }
}

module.exports = nextConfig
