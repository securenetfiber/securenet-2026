import type { NextRequest } from 'next/server';

// Shared bot/spam protection for public form API routes.

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
export const MIN_SUBMIT_TIME_MS = 3000;

// Separate buckets per form so one form doesn't eat another's limit
const buckets = new Map<string, Map<string, number[]>>();

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function isRateLimited(bucket: string, ip: string): boolean {
  let ipRequests = buckets.get(bucket);
  if (!ipRequests) {
    ipRequests = new Map();
    buckets.set(bucket, ipRequests);
  }
  const now = Date.now();
  const timestamps = ipRequests.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;
  recent.push(now);
  ipRequests.set(ip, recent);
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const ipRequests of buckets.values()) {
    for (const [ip, timestamps] of ipRequests) {
      const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
      if (recent.length === 0) ipRequests.delete(ip);
      else ipRequests.set(ip, recent);
    }
  }
}, 5 * 60 * 1000);

const BLOCKED_EMAIL_DOMAINS = [
  'example.com', 'test.com', 'mailinator.com', 'tempmail.com', 'throwaway.email',
  'guerrillamail.com', 'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com',
  'grr.la', 'dispostable.com',
];

export function isBlockedEmail(email: string): boolean {
  const domain = (email || '').split('@')[1]?.toLowerCase() || '';
  return BLOCKED_EMAIL_DOMAINS.includes(domain);
}

/**
 * Random strings bots put in name fields: consonant runs like "xkqzbrt" or
 * mixed case like "DvMNkQrLpT". Real one-word names ("Robert") pass.
 */
export function isGibberishName(name: string): boolean {
  if (!name || !/^[a-zA-Z]{6,}$/.test(name)) return false;
  const vowels = (name.match(/[aeiouy]/gi) || []).length;
  const innerCaps = (name.slice(1).match(/[A-Z]/g) || []).length;
  return vowels === 0 || /[^aeiouy]{5,}/i.test(name) || innerCaps >= 2;
}

export function isFakePhone(phone: string): boolean {
  const digits = (phone || '').replace(/\D/g, '');
  return !!digits && /^555\d{7}$/.test(digits);
}

export function looksLikeSpam(text: string): boolean {
  const lower = text.toLowerCase();
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|lottery|crypto.*invest|bitcoin.*profit)\b/i,
    /\b(buy now|act now|limited time|click here|free money)\b/i,
    /\b(nigerian prince|wire transfer|western union)\b/i,
    /(https?:\/\/[^\s]+){3,}/,
    /\[url=/i,
    /\[link=/i,
    /<a\s+href/i,
    /(\bunion\b.*\bselect\b|\bselect\b.*\bfrom\b.*\bwhere\b)/i,
    /(\bdrop\b\s+\btable\b|\binsert\b\s+\binto\b|\bdelete\b\s+\bfrom\b)/i,
    /(\bexec\b\s*\(|\bexecute\b\s*\()/i,
    /('\s*(or|and)\s+['"]?\d+['"]?\s*=\s*['"]?\d+)/i,
    /(--|;)\s*(drop|alter|create|insert|update|delete|exec|union|select)\b/i,
    /\b(xp_cmdshell|sp_executesql|information_schema|sysobjects)\b/i,
    /('|")\s*(or|and)\s+('|")/i,
    /\b(sleep|benchmark|waitfor)\s*\(/i,
    /(\%27|\')\s*(union|select|insert|drop|update|delete)\b/i,
    /1\s*=\s*1|1'\s*or\s*'1/i,
  ];
  return spamPatterns.some((p) => p.test(lower));
}

/** Script/markup/template injection probes and links, which never belong in short fields like name or address. */
export function hasInjectionOrLink(text: string): boolean {
  return /<\s*\/?\s*[a-z!]|javascript:|\bon\w+\s*=|\$\{|\{\{|https?:\/\/|www\.|\.\.\/|\/etc\/passwd|\bnslookup\b/i.test(text);
}
