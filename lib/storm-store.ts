import { promises as fs } from 'fs';
import type { StormPhase } from './alerts';

const STORM_FILE = '/var/www/securenet/data/storm.json';

export interface StoredStorm {
  enabled: boolean;
  phase: StormPhase;
  message: string;
  updatedAt: string;
  updatedBy: string;
}

export async function getStorm(): Promise<StoredStorm> {
  try {
    const data = await fs.readFile(STORM_FILE, 'utf-8');
    return JSON.parse(data) as StoredStorm;
  } catch {
    return {
      enabled: false,
      phase: 'clear',
      message: '',
      updatedAt: '',
      updatedBy: '',
    };
  }
}

export async function saveStorm(data: {
  enabled: boolean;
  phase: StormPhase;
  message: string;
}): Promise<StoredStorm> {
  const storm: StoredStorm = {
    enabled: data.enabled,
    phase: data.phase,
    message: data.message,
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin',
  };
  await fs.writeFile(STORM_FILE, JSON.stringify(storm, null, 2), 'utf-8');
  return storm;
}
