/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/bazi-ai',  // 替换为您的仓库名
}

module.exports = nextConfig