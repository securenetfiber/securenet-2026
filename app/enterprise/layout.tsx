import type { Metadata } from 'next';
import EnterpriseHeader from '@/components/EnterpriseHeader';
import EnterpriseFooter from '@/components/EnterpriseFooter';

export const metadata: Metadata = {
  title: {
    default: 'Enterprise | SecureNet Fiber',
    template: '%s | SecureNet Enterprise',
  },
  description:
    'Enterprise fiber, managed services, and business security from SecureNet. Dedicated internet, network design, cameras, access control, and VoIP for commercial clients.',
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="enterprise-theme">
      <EnterpriseHeader />
      {children}
      <EnterpriseFooter />
    </div>
  );
}
