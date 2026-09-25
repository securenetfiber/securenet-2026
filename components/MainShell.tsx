'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SwitchHeader from '@/components/SwitchHeader';
import SwitchFooter from '@/components/SwitchFooter';
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
  const isSwitch = pathname === '/switch' || pathname.startsWith('/switch/');

  if (isEnterprise) {
    return <>{children}</>;
  }

  if (isSwitch) {
    return (
      <>
        <SwitchHeader alert={alert} />
        <main>{children}</main>
        <SwitchFooter />
      </>
    );
  }

  return (
    <>
      <Header alert={alert} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
