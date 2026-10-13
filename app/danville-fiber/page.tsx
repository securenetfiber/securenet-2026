import type { Metadata } from 'next';
import SameFiberLanding from '@/components/samefiber/SameFiberLanding';
import { SAME_FIBER_COPY } from '@/lib/samefiber-copy';

// Landing page for the Danville mailer and ads. Not linked from anywhere on the site.
export const metadata: Metadata = {
  title: { absolute: SAME_FIBER_COPY.meta.title },
  description: SAME_FIBER_COPY.meta.description,
  robots: { index: false, follow: false },
};

export default function DanvilleFiberPage() {
  return <SameFiberLanding />;
}
