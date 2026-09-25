import type { Metadata } from 'next';
import SwitchLanding from '@/components/SwitchLanding';
import { SWITCH_COPY } from '@/lib/switch-copy';

// Landing page for paid ads and print. Not linked from anywhere on the site.
export const metadata: Metadata = {
  title: SWITCH_COPY.meta.title,
  description: SWITCH_COPY.meta.description,
  robots: { index: false, follow: false },
};

export default async function SwitchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const from = typeof params.from === 'string' ? params.from.slice(0, 50) : undefined;

  return <SwitchLanding from={from} />;
}
