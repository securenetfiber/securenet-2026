import type { Metadata } from 'next';
import { headers } from 'next/headers';
import MainShell from '@/components/MainShell';
import { OrganizationSchema, LocalBusinessSchema } from '@/components/SchemaOrg';
import { getAlert } from '@/lib/alert-store';
import { siteAlert } from '@/lib/alerts';

export const metadata: Metadata = {
  title: {
    default: 'SecureNet Fiber - Fast, Reliable Internet',
    template: '%s | SecureNet Fiber',
  },
  description:
    'Fiber internet from SecureNet. Multi-gig speeds, no data caps, no contracts. Serving the Kanawha Valley, WV and Danville, VA.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await headers();
  let alert;
  try {
    alert = await getAlert();
  } catch {
    alert = { ...siteAlert, updatedAt: '', updatedBy: '' };
  }

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
        <MainShell alert={alert}>
          {children}
        </MainShell>
      </body>
    </html>
  );
}
