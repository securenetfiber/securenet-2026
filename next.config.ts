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
      // Vanity URLs for print pieces. Temporary so destinations can change.
      { source: '/mail', destination: '/switch?src=mail1', permanent: false },
      { source: '/door', destination: '/switch?src=hanger', permanent: false },
      { source: '/sign', destination: '/switch?src=sign', permanent: false },
    ];
  },
}

export default nextConfig
