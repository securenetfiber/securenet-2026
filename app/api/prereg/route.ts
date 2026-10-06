import { NextRequest, NextResponse } from 'next/server';
import {
  MIN_SUBMIT_TIME_MS,
  getClientIp,
  hasInjectionOrLink,
  isBlockedEmail,
  isFakePhone,
  isGibberishName,
  isRateLimited,
  looksLikeSpam,
} from '@/lib/spam';

const COGNITO_API_URL = 'https://www.cognitoforms.com/api/forms/54/entries';

// Optional attribution values a caller may send, mapped to form 54 field names.
const ATTRIBUTION_FIELDS: Record<string, string> = {
  src: 'Source',
  from: 'From',
  utm_source: 'UTMSource',
  utm_medium: 'UTMMedium',
  utm_campaign: 'UTMCampaign',
  utm_content: 'UTMContent',
  gclid: 'GCLID',
  fbclid: 'FBCLID',
};

function cleanValue(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, 200) : '';
}

async function postEntry(apiKey: string, entry: Record<string, string>) {
  return fetch(COGNITO_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
}

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited('prereg', getClientIp(req))) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    const apiKey = process.env.COGNITO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await req.json();

    // Bot rejections get a fake success so they don't retry with tweaks
    if (body._company) return NextResponse.json({ success: true });

    // Unlike the contact form, the timestamp is required here. Scripts
    // posting straight to the API never load the page, so they won't have it.
    const loadedAt = Number(body._loadedAt);
    if (!loadedAt || Date.now() - loadedAt < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ success: true });
    }

    const fields = [body.name, body.email, body.address, body.phone];
    if (fields.some((v) => v != null && typeof v !== 'string')) {
      return NextResponse.json({ success: true });
    }
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const address = (body.address || '').trim();
    const phone = (body.phone || '').trim();

    if (!name || !email || !address || name.length > 100 || email.length > 254 || address.length > 200 || phone.length > 30) {
      return NextResponse.json({ success: true });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || isBlockedEmail(email)) {
      return NextResponse.json({ success: true });
    }
    if (phone && (/[^\d\s()+.\-]/.test(phone) || isFakePhone(phone))) {
      return NextResponse.json({ success: true });
    }
    if (isGibberishName(name) || hasInjectionOrLink(`${name} ${address}`) || looksLikeSpam(fields.join(' '))) {
      return NextResponse.json({ success: true });
    }

    const entry: Record<string, string> = {
      Name: name,
      Email: email,
      Address: address,
      Phone: phone,
    };

    // Source tag and attribution are optional. Pages that don't send them
    // (St. Albans) submit exactly the same entry as before.
    const extras: Record<string, string> = {};
    const source = cleanValue(body.source);
    if (source) extras.Source = source;
    if (body.attribution && typeof body.attribution === 'object') {
      for (const [key, field] of Object.entries(ATTRIBUTION_FIELDS)) {
        // An explicit source tag wins over the URL's src for the Source field
        if (field === 'Source' && source) continue;
        const value = cleanValue(body.attribution[key]);
        if (value) extras[field] = value;
      }
    }

    const hasExtras = Object.keys(extras).length > 0;
    let response = await postEntry(apiKey, { ...entry, ...extras });

    // If form 54 doesn't have the attribution fields yet, don't lose the
    // lead: retry with just the base fields.
    if (!response.ok && hasExtras && response.status >= 400 && response.status < 500) {
      const errorText = await response.text();
      console.error('Cognito API rejected attribution fields, retrying without them:', response.status, errorText);
      response = await postEntry(apiKey, entry);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cognito API error:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to submit form' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pre-reg form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
