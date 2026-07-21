/**
 * Alert bar configuration.
 *
 * To show an alert, set `enabled: true` and fill in the message.
 * To hide it, set `enabled: false`.
 *
 * Variants:
 *   'info'     -- navy background (general announcements)
 *   'warning'  -- amber background (degraded service)
 *   'critical' -- red background (outage)
 */
export interface SiteAlert {
  enabled: boolean;
  variant: 'info' | 'warning' | 'critical';
  message: string;
  linkText?: string;
  linkHref?: string;
}

export const siteAlert: SiteAlert = {
  enabled: false,
  variant: 'warning',
  message: 'We are currently experiencing service interruptions across our entire network.',
  linkText: 'View status',
  linkHref: '/status',
};

/**
 * Storm status configuration — independent of the site-wide alert bar.
 * Only displayed on the /storm page.
 *
 * Phases:
 *   'monitoring' -- pre-storm, crews preparing
 *   'active'     -- storm in progress, crews deploy when safe
 *   'restoring'  -- post-storm, crews working
 *   'clear'      -- no active weather events (default)
 */
export type StormPhase = 'monitoring' | 'active' | 'restoring' | 'clear';

export interface StormStatus {
  enabled: boolean;
  phase: StormPhase;
  message?: string;
}

const stormMessages: Record<StormPhase, string> = {
  monitoring:
    'We’re monitoring severe weather in the Kanawha Valley and our crews are prepared to respond.',
  active:
    'Severe weather is impacting our service area. Crews will deploy as soon as conditions are safe.',
  restoring:
    'Our crews are actively working to restore service. Report damage below.',
  clear:
    'No active weather events. Use the form below to report any service issues.',
};

export const stormStatus: StormStatus = {
  enabled: false,
  phase: 'clear',
};

export function getStormMessage(status: StormStatus): string {
  return status.message || stormMessages[status.phase];
}
