function base64urlEncode(data: string): string {
  return btoa(data).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlDecode(str: string): Uint8Array {
  const padded = str + '='.repeat((4 - (str.length % 4)) % 4);
  const binary = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    arr[i] = binary.charCodeAt(i);
  }
  return arr;
}

export async function signJWT(
  payload: Record<string, unknown>,
  secret: string,
): Promise<string> {
  const header = base64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const body = base64urlEncode(
    JSON.stringify({ ...payload, iat: now, exp: now + 86400 }),
  );

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const sig = new Uint8Array(
    await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(`${header}.${body}`),
    ),
  );
  const sigB64 = base64urlEncode(String.fromCharCode(...sig));

  return `${header}.${body}.${sigB64}`;
}

export async function verifyJWT(
  token: string,
  secret: string,
): Promise<Record<string, unknown> | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, sig] = parts;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );

    const sigBytes = base64urlDecode(sig);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes as unknown as ArrayBuffer,
      new TextEncoder().encode(`${header}.${body}`),
    );

    if (!valid) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(base64urlDecode(body)),
    );
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000))
      return null;

    return payload;
  } catch {
    return null;
  }
}
