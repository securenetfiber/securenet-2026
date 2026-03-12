'use client';

import { useState } from 'react';
import type { Plan } from '@/lib/plans';
import PlanCard from './PlanCard';
import BroadbandLabel from './BroadbandLabel';

export default function PlanCardWithLabel({ plan }: { plan: Plan }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="plan-card-wrapper">
      <PlanCard plan={plan} />
      <button
        className="bb-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? 'Hide Broadband Facts' : 'View Broadband Facts'}
      </button>
      {open && <BroadbandLabel plan={plan} />}
    </div>
  );
}
