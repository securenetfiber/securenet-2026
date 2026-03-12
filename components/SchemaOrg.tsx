import { COMPANY_INFO } from '@/lib/plans';
import type { Plan } from '@/lib/plans';

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.website,
    logo: `${COMPANY_INFO.website}/img/SN-Logo-Master.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-304-744-4034',
        contactType: 'customer service',
        areaServed: 'US-WV',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-434-354-0101',
        contactType: 'customer service',
        areaServed: 'US-VA',
        availableLanguage: 'English',
      },
    ],
    sameAs: [
      COMPANY_INFO.socialLinks.facebook,
      COMPANY_INFO.socialLinks.instagram,
      COMPANY_INFO.socialLinks.youtube,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'InternetServiceProvider',
    '@id': `${COMPANY_INFO.website}/#isp`,
    name: COMPANY_INFO.name,
    url: COMPANY_INFO.website,
    telephone: '+1-304-744-4034',
    email: COMPANY_INFO.email,
    image: `${COMPANY_INFO.website}/img/SN-Logo-Master.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'South Charleston',
      addressRegion: 'WV',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'West Virginia',
      },
      {
        '@type': 'State',
        name: 'Virginia',
      },
    ],
    priceRange: '$52 - $152',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PlanSchema({ plans }: { plans: Plan[] }) {
  const data = plans.map((plan) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${COMPANY_INFO.name} ${plan.name}`,
    description: plan.features.join('. '),
    brand: { '@type': 'Brand', name: COMPANY_INFO.name },
    offers: {
      '@type': 'Offer',
      price: plan.price,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: plan.price,
        priceCurrency: 'USD',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON',
        },
      },
      availability: 'https://schema.org/InStock',
      url: plan.ctaHref || COMPANY_INFO.signupUrl,
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${COMPANY_INFO.website}${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
