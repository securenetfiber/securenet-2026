/* ── Referral Program ─────────────────────────────────────────────
 * Types and code generation for the customer referral program.
 * Structured for future Sonar API integration.
 * ─────────────────────────────────────────────────────────────── */

export interface ReferralSubmission {
  referrerName: string;
  referrerAccount: string; // account number or phone
  referrerEmail: string;
  referralCode: string;
  generatedAt: string; // ISO
}

export interface ReferredSignup {
  referralCode: string;
  // remaining fields captured by sign-up form
}

// Alphanumeric chars with ambiguous ones removed (0/O, 1/I/L)
const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/**
 * Generate a deterministic referral code from an account identifier.
 * Same input always produces the same code so a customer can
 * regenerate their link without creating duplicates.
 *
 * Format: SNF-XXXXXX (e.g. SNF-A3B7K2)
 */
export function generateReferralCode(accountId: string): string {
  const normalized = accountId.trim().toUpperCase();

  // Simple string hash (djb2)
  let hash = 5381;
  for (let i = 0; i < normalized.length; i++) {
    hash = ((hash << 5) + hash + normalized.charCodeAt(i)) | 0;
  }

  let code = '';
  let h = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    code += CHARS[h % CHARS.length];
    h = Math.floor(h / CHARS.length);
  }

  return `SNF-${code}`;
}

/**
 * Basic validation for referral code format.
 */
export function isValidReferralCode(code: string): boolean {
  return /^SNF-[A-Z2-9]{6}$/.test(code);
}
