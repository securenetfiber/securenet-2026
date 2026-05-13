const attempts = new Map<string, number[]>();

export function checkRateLimit(
  ip: string,
  max = 5,
  windowMs = 60000,
): boolean {
  const now = Date.now();
  const timestamps = (attempts.get(ip) || []).filter(
    (t) => now - t < windowMs,
  );

  if (timestamps.length >= max) {
    attempts.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  attempts.set(ip, timestamps);
  return true;
}
