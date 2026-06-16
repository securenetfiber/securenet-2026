import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/business/managed-services',
        destination: '/enterprise',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
