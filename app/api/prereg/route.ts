import { NextRequest, NextResponse } from 'next/server';

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
    const apiKey = process.env.COGNITO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await req.json();

    const entry: Record<string, string> = {
      Name: body.name,
      Email: body.email,
      Address: body.address,
      Phone: body.phone || '',
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
