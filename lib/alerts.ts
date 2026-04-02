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
