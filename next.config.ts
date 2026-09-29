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
      { source: '/mail2', destination: '/switch?src=mail2', permanent: false },
      { source: '/mail3', destination: '/switch?src=mail3', permanent: false },
      { source: '/mail4', destination: '/switch?src=mail4', permanent: false },
      // Competitor mailers. /5g uses the tmobile headline key.
      { source: '/optimum', destination: '/switch?src=obj-optimum&from=optimum', permanent: false },
      { source: '/frontier', destination: '/switch?src=obj-frontier&from=frontier', permanent: false },
      { source: '/5g', destination: '/switch?src=obj-tmobile&from=tmobile', permanent: false },
    ];
  },
}

export default nextConfig
