'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { SiteAlert } from '@/lib/alerts';

export default function MainShell({
  alert,
  children,
}: {
  alert: SiteAlert;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEnterprise = pathname.startsWith('/enterprise');

  if (isEnterprise) {
    return <>{children}</>;
  }

  return (
    <>
      <Header alert={alert} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
