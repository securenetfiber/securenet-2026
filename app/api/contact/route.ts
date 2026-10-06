import { NextRequest, NextResponse } from 'next/server';
import {
  MIN_SUBMIT_TIME_MS,
  getClientIp,
  isBlockedEmail,
  isFakePhone,
  isGibberishName,
  isRateLimited,
  looksLikeSpam,
} from '@/lib/spam';

const COGNITO_API_URL = 'https://www.cognitoforms.com/api/forms/52/entries';

export async function POST(req: NextRequest) {
  try {
    if (isRateLimited('contact', getClientIp(req))) {
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

    const msg = (body.message || '').trim();
    if (msg.length < 10 || /^\d+$/.test(msg)) {
      return NextResponse.json({ success: true });
    }

    if (isBlockedEmail(body.email)) {
      return NextResponse.json({ success: true });
    }

    const name = body.name || body.businessName || body.primaryContact || '';
    if (isGibberishName(name)) {
      return NextResponse.json({ success: true });
    }

    if (isFakePhone(body.phone)) {
      return NextResponse.json({ success: true });
    }

    const messageText = [msg, name, body.email]
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
