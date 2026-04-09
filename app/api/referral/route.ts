import { NextRequest, NextResponse } from 'next/server';
import { generateReferralCode } from '@/lib/referral';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name || '').trim();
    const account = (body.account || '').trim();
    const email = (body.email || '').trim();

    if (!name || !account || !email) {
      return NextResponse.json(
        { error: 'Name, account number or phone, and email are required.' },
        { status: 400 }
      );
    }

    const code = generateReferralCode(account);

    const origin = req.nextUrl.origin;
    const shareUrl = `${origin}/referral?ref=${code}`;

    // TODO: Wire up to Sonar API for referral tracking
    // Use querySonar() pattern from app/api/sonar-test/route.ts

    return NextResponse.json({ code, shareUrl });
  } catch (error) {
    console.error('Referral API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
