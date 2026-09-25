// Client-side attribution capture for /switch. Browser only.

export const SWITCH_ATTR_KEYS = [
  'src',
  'from',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'gclid',
  'fbclid',
] as const;

export type SwitchAttrKey = (typeof SWITCH_ATTR_KEYS)[number];
export type SwitchAttribution = Partial<Record<SwitchAttrKey, string>>;

const STORAGE_KEY = 'sn_switch_attr';
const MAX_VALUE_LENGTH = 200;

function readStored(): SwitchAttribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    const out: SwitchAttribution = {};
    for (const key of SWITCH_ATTR_KEYS) {
      if (typeof parsed[key] === 'string' && parsed[key]) out[key] = parsed[key];
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Reads attribution params from the URL and merges them into sessionStorage.
 * First touch wins within a session: a stored value is never overwritten,
 * and never replaced with an empty one. Returns the merged values.
 */
export function captureSwitchAttribution(search: string): SwitchAttribution {
  const stored = readStored();
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return stored;
  }

  const merged: SwitchAttribution = { ...stored };
  for (const key of SWITCH_ATTR_KEYS) {
    const value = params.get(key)?.trim().slice(0, MAX_VALUE_LENGTH);
    if (value && !merged[key]) merged[key] = value;
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Storage blocked (private mode, etc.). Values still work for this page view.
  }

  return merged;
}
