import { NextRequest, NextResponse } from 'next/server';
import { getAlert, saveAlert } from '@/lib/alert-store';
import { verifyJWT } from '@/lib/jwt';

export async function GET() {
  const alert = await getAlert();
  return NextResponse.json(alert);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret || !(await verifyJWT(token, secret))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { enabled, variant, message, linkText, linkHref } = body;

  if (typeof enabled !== 'boolean') {
    return NextResponse.json(
      { error: 'enabled must be a boolean' },
      { status: 400 },
    );
  }

  if (!['info', 'warning', 'critical'].includes(variant as string)) {
    return NextResponse.json({ error: 'Invalid variant' }, { status: 400 });
  }

  if (typeof message !== 'string' || message.length > 500) {
    return NextResponse.json(
      { error: 'Message must be under 500 characters' },
      { status: 400 },
    );
  }

  if (linkText !== undefined && typeof linkText !== 'string') {
    return NextResponse.json(
      { error: 'linkText must be a string' },
      { status: 400 },
    );
  }

  if (linkHref !== undefined && typeof linkHref !== 'string') {
    return NextResponse.json(
      { error: 'linkHref must be a string' },
      { status: 400 },
    );
  }

  const alert = await saveAlert({
    enabled,
    variant: variant as 'info' | 'warning' | 'critical',
    message: message.trim().slice(0, 500),
    linkText: ((linkText as string) || '').trim(),
    linkHref: ((linkHref as string) || '').trim(),
  });

  return NextResponse.json(alert);
}
