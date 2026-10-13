'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SwitchHeader from '@/components/SwitchHeader';
import SwitchFooter from '@/components/SwitchFooter';
import SameFiberHeader from '@/components/samefiber/SameFiberHeader';
import SameFiberFooter from '@/components/samefiber/SameFiberFooter';
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
  const isSameFiber = pathname === '/danville-fiber' || pathname.startsWith('/danville-fiber/');

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

  if (isSameFiber) {
    return (
      <>
        <SameFiberHeader alert={alert} />
        <main>{children}</main>
        <SameFiberFooter />
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
