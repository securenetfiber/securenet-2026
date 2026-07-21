import { NextRequest, NextResponse } from 'next/server';
import { getStorm, saveStorm } from '@/lib/storm-store';
import { verifyJWT } from '@/lib/jwt';

export async function GET() {
  const storm = await getStorm();
  return NextResponse.json(storm);
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

  const { enabled, phase, message } = body;

  if (typeof enabled !== 'boolean') {
    return NextResponse.json({ error: 'enabled must be a boolean' }, { status: 400 });
  }

  const validPhases = ['monitoring', 'active', 'restoring', 'clear'];
  if (!validPhases.includes(phase as string)) {
    return NextResponse.json({ error: 'Invalid phase' }, { status: 400 });
  }

  if (message !== undefined && typeof message !== 'string') {
    return NextResponse.json({ error: 'message must be a string' }, { status: 400 });
  }

  const storm = await saveStorm({
    enabled,
    phase: phase as 'monitoring' | 'active' | 'restoring' | 'clear',
    message: ((message as string) || '').trim().slice(0, 500),
  });

  return NextResponse.json(storm);
}
