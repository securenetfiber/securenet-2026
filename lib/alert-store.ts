import { promises as fs } from 'fs';
import { siteAlert, type SiteAlert } from './alerts';

const ALERT_FILE = '/var/www/securenet/data/alert.json';

export interface StoredAlert extends SiteAlert {
  updatedAt: string;
  updatedBy: string;
}

export async function getAlert(): Promise<StoredAlert> {
  try {
    const data = await fs.readFile(ALERT_FILE, 'utf-8');
    return JSON.parse(data) as StoredAlert;
  } catch {
    return {
      ...siteAlert,
      updatedAt: '',
      updatedBy: '',
    };
  }
}

export async function saveAlert(data: {
  enabled: boolean;
  variant: 'info' | 'warning' | 'critical';
  message: string;
  linkText?: string;
  linkHref?: string;
}): Promise<StoredAlert> {
  const alert: StoredAlert = {
    enabled: data.enabled,
    variant: data.variant,
    message: data.message,
    linkText: data.linkText || '',
    linkHref: data.linkHref || '',
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin',
  };
  await fs.writeFile(ALERT_FILE, JSON.stringify(alert, null, 2), 'utf-8');
  return alert;
}
