export interface Fee {
  name: string;
  amount: number;
  frequency: 'one-time' | 'monthly';
  note?: string;
}

export interface Plan {
  id: string;
  name: string;
  speed: number | string;
  speedUnit: string;
  price: number;
  features: string[];
  featured: boolean;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
  /* FCC broadband label fields */
  fccId: string;
  typicalDownload: number;
  typicalUpload: number;
  typicalLatency: number;
  dataAllowance: string;
  fees: Fee[];
  contractRequired: boolean;
  planType: 'residential' | 'business';
}

export const COMPANY_INFO = {
  name: 'SecureNet Fiber',
  legalName: 'SecureNet Fiber LLC',
  phones: {
    wv: '(304) 744-4034',
    va: '(434) 354-0101',
  },
  email: 'info@securenetfiber.com',
  supportHours: {
    office: 'Monday \u2013 Friday, 9 AM \u2013 5 PM',
    support: 'Monday \u2013 Friday, 8 AM \u2013 8 PM | Saturday \u2013 Sunday, 12 PM \u2013 8 PM',
  },
  policyUrls: {
    privacy: '/legal/privacy',
    terms: '/legal/terms',
    acceptableUse: '/legal/acceptable-use',
  },
  socialLinks: {
    facebook: 'https://facebook.com/securenetfiber',
    instagram: 'https://instagram.com/securenetfiber',
    youtube: 'https://youtube.com/@securenetfiber',
  },
  locations: [
    { name: 'Kanawha Valley', state: 'WV', city: 'South Charleston' },
    { name: 'Danville', state: 'VA', city: 'Danville' },
  ],
  website: 'https://securenetfiber.com',
  signupUrl: 'https://securenetfiber.com/service-request/',
  billPayUrl: 'https://billing.securenetfiber.com',
  speedTestUrl: 'https://securenet.speedtest.net',
} as const;

const standardFees: Fee[] = [
  { name: 'Installation', amount: 0, frequency: 'one-time', note: 'Free during launch' },
];

export const residentialPlans: Plan[] = [
  {
    id: 'res-500',
    name: '500 Mbps',
    speed: 500,
    speedUnit: 'Mbps',
    price: 52,
    features: [
      'Symmetrical upload and download',
      'Great for streaming, video calls, and working from home',
      'Connect 10+ devices',
      'No data caps',
      'No contracts',
      'Wi-Fi router included',
    ],
    featured: false,
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-RES-500-2026',
    typicalDownload: 470,
    typicalUpload: 470,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'residential',
  },
  {
    id: 'res-1g',
    name: '1 Gig',
    speed: 1,
    speedUnit: 'Gbps',
    price: 72,
    features: [
      'Symmetrical upload and download',
      'Handle 4K streams, large transfers, and gaming at the same time',
      'Connect 25+ devices',
      'No data caps',
      'No contracts',
      'Wi-Fi router included',
    ],
    featured: true,
    badge: 'Most Popular',
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-RES-1G-2026',
    typicalDownload: 940,
    typicalUpload: 940,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'residential',
  },
  {
    id: 'res-5g',
    name: '5 Gig',
    speed: 5,
    speedUnit: 'Gbps',
    price: 152,
    features: [
      'Symmetrical upload and download',
      'Built for power users, content creators, and large households',
      'Connect 50+ devices',
      'No data caps',
      'No contracts',
      'Wi-Fi router included',
    ],
    featured: false,
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-RES-5G-2026',
    typicalDownload: 4700,
    typicalUpload: 4700,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'residential',
  },
];

export const businessPlans: Plan[] = [
  {
    id: 'biz-start',
    name: 'FiberStart',
    speed: 500,
    speedUnit: 'Mbps',
    price: 72,
    features: [
      'Symmetrical upload/download',
      'No data caps',
      'No contracts',
      'SLA-backed uptime',
    ],
    featured: false,
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-BIZ-500-2026',
    typicalDownload: 470,
    typicalUpload: 470,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'business',
  },
  {
    id: 'biz-grow',
    name: 'FiberGrow',
    speed: 1,
    speedUnit: 'Gbps',
    price: 92,
    features: [
      'Symmetrical upload/download',
      'No data caps',
      'No contracts',
      'SLA-backed uptime',
    ],
    featured: true,
    badge: 'Most Popular',
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-BIZ-1G-2026',
    typicalDownload: 940,
    typicalUpload: 940,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'business',
  },
  {
    id: 'biz-pro',
    name: 'FiberPro',
    speed: 2,
    speedUnit: 'Gbps',
    price: 132,
    features: [
      'Symmetrical upload/download',
      'No data caps',
      'No contracts',
      'SLA-backed uptime',
    ],
    featured: false,
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-BIZ-2G-2026',
    typicalDownload: 1880,
    typicalUpload: 1880,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'business',
  },
];

export const homePreviewPlans: Plan[] = [
  {
    id: 'home-500',
    name: '500 Mbps',
    speed: 500,
    speedUnit: 'Mbps',
    price: 52,
    features: [
      'Fiber-to-the-home',
      'No data caps',
      'No contracts',
      'Great for streaming and browsing',
    ],
    featured: false,
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-RES-500-2026',
    typicalDownload: 470,
    typicalUpload: 470,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'residential',
  },
  {
    id: 'home-1g',
    name: '1 Gig',
    speed: 1,
    speedUnit: 'Gbps',
    price: 72,
    features: [
      'Fiber-to-the-home',
      'No data caps',
      'No contracts',
      'Ideal for families and remote work',
    ],
    featured: true,
    badge: 'Most Popular',
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-RES-1G-2026',
    typicalDownload: 940,
    typicalUpload: 940,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'residential',
  },
  {
    id: 'home-5g',
    name: '5 Gig',
    speed: 5,
    speedUnit: 'Gbps',
    price: 152,
    features: [
      'Fiber-to-the-home',
      'No data caps',
      'No contracts',
      'For power users and large homes',
    ],
    featured: false,
    ctaText: 'Get Started',
    ctaHref: 'https://securenetfiber.com/service-request/',
    fccId: 'SNF-RES-5G-2026',
    typicalDownload: 4700,
    typicalUpload: 4700,
    typicalLatency: 3,
    dataAllowance: 'Unlimited',
    fees: standardFees,
    contractRequired: false,
    planType: 'residential',
  },
];
