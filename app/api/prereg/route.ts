import { NextRequest, NextResponse } from 'next/server';

const COGNITO_API_URL = 'https://www.cognitoforms.com/api/forms/54/entries';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.COGNITO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await req.json();

    const entry = {
      Name: body.name,
      Email: body.email,
      Address: body.address,
      Phone: body.phone || '',
    };

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
      return NextResponse.json({ error: 'Failed to submit form' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pre-reg form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
