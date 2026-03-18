import { NextRequest, NextResponse } from 'next/server';

const COGNITO_API_URL = 'https://www.cognitoforms.com/api/forms/52/entries';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.COGNITO_API_KEY;
    if (!apiKey) {
      console.error('COGNITO_API_KEY not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // TEMP DEBUG: log last 10 chars of key so we can verify which key Vercel is using
    console.log('Key tail:', apiKey.slice(-10));

    const body = await req.json();

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
        { error: 'Failed to submit form', debug: `${response.status}: ${errorText}` },
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
