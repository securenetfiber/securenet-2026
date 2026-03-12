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
}

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
  },
];
