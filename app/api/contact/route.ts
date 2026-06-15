import { NextRequest, NextResponse } from 'next/server';

const COGNITO_API_URL = 'https://www.cognitoforms.com/api/forms/52/entries';

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_SUBMIT_TIME_MS = 3000;

const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
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
  for (const [ip, timestamps] of ipRequests) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (recent.length === 0) ipRequests.delete(ip);
    else ipRequests.set(ip, recent);
  }
}, 5 * 60 * 1000);

function looksLikeSpam(text: string): boolean {
  const lower = text.toLowerCase();
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|lottery|crypto.*invest|bitcoin.*profit)\b/i,
    /\b(buy now|act now|limited time|click here|free money)\b/i,
    /\b(nigerian prince|wire transfer|western union)\b/i,
    /(https?:\/\/[^\s]+){3,}/,
    /\[url=/i,
    /\[link=/i,
    /<a\s+href/i,
  ];
  return spamPatterns.some((p) => p.test(lower));
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    const apiKey = process.env.COGNITO_API_KEY;
    if (!apiKey) {
      console.error('COGNITO_API_KEY not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const body = await req.json();

    if (body._company) {
      return NextResponse.json({ success: true });
    }

    if (body._loadedAt) {
      const elapsed = Date.now() - body._loadedAt;
      if (elapsed < MIN_SUBMIT_TIME_MS) {
        return NextResponse.json({ success: true });
      }
    }

    const messageText = [body.message, body.name, body.businessName, body.email]
      .filter(Boolean)
      .join(' ');
    if (looksLikeSpam(messageText)) {
      return NextResponse.json({ success: true });
    }

    // Build Cognito entry payload using exact InternalName fields from schema
    const entry: Record<string, unknown> = {
      CustomerType: body.customerType || 'Residential',
      Name: body.name || '',
      PhoneNumber: body.phone || '',
      EmailAddress: body.email,
      InquiryType: body.inquiryType || '',
      YourMessage: body.message || '',
    };

    // Business-specific fields
    if (body.customerType === 'Business') {
      entry.BusinessName = body.businessName || '';
      entry.PrimaryContact = body.primaryContact || '';
    }

    // Technical Support fields
    if (body.inquiryType === 'Technical Support') {
      entry.TechnicalIssue = body.technicalIssue || '';
      if (body.internetStillNotWorking) {
        entry.MyInternetIsStillNOTWorking = true;
      }
    }

    // Interested in service fields
    if (body.inquiryType === "I'm interested in Internet Service from my Home!") {
      entry.NewServiceRequestAddress = body.serviceAddress || '';
      entry.NewServiceRequestCity = body.serviceCity || '';
    }

    // Outside fiber concern
    if (body.inquiryType === 'Outside Fiber Service Concern') {
      entry.ServiceAddress = body.serviceAddress || '';
    }

    const response = await fetch(COGNITO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cognito API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
