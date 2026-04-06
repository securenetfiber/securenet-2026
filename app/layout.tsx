import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrganizationSchema, LocalBusinessSchema } from '@/components/SchemaOrg';

export const metadata: Metadata = {
  title: {
    default: 'SecureNet Fiber - Fast, Reliable Internet',
    template: '%s | SecureNet Fiber',
  },
  description:
    'Fiber internet from SecureNet. Speeds up to 8.5 Gbps, no data caps, no contracts. Serving the Kanawha Valley, WV and Danville, VA.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={`/css/style.css?v=${Date.now()}`} />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
