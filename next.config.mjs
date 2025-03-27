/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
      styledComponents: true, // ✅ Ensure styled-components support is enabled
    },
    experimental: {
      appDir: true, // ✅ Ensure App Router support
    },
  };
  
  module.exports = nextConfig;
  