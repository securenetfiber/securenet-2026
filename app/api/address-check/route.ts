import { NextRequest, NextResponse } from 'next/server';

const SONAR_ENDPOINT = 'https://securenet.sonar.software/api/graphql';

interface SonarAddress {
  id: string;
  line1: string;
  city: string;
  subdivision: string;
  zip: string;
  serviceable: boolean;
}

async function querySonar(query: string) {
  const apiKey = process.env.SONAR_API_KEY;
  if (!apiKey) {
    throw new Error('SONAR_API_KEY is not configured');
  }

  const res = await fetch(SONAR_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sonar API returned ${res.status}: ${text}`);
  }

  return res.json();
}

function formatSubdivision(sub: string): string {
  // Sonar stores as "US_WV", "US_VA" etc. Extract the state code.
  return sub.replace('US_', '');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const address = body.address?.trim();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Escape quotes in the search string
    const escaped = address.replace(/"/g, '\\"');

    const query = `{
      addresses(
        general_search: "${escaped}"
        paginator: { page: 1, records_per_page: 10 }
      ) {
        entities {
          id
          line1
          city
          subdivision
          zip
          serviceable
        }
      }
    }`;

    const data = await querySonar(query);
    const addresses: SonarAddress[] = data?.data?.addresses?.entities ?? [];

    if (addresses.length === 0) {
      return NextResponse.json({
        serviceable: false,
        status: 'not_found',
      });
    }

    const serviceable = addresses.find((a) => a.serviceable === true);

    if (serviceable) {
      const state = formatSubdivision(serviceable.subdivision);
      return NextResponse.json({
        serviceable: true,
        status: 'serviceable',
        address: `${serviceable.line1}, ${serviceable.city}, ${state} ${serviceable.zip}`,
      });
    }

    return NextResponse.json({
      serviceable: false,
      status: 'not_serviceable',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Address check error:', message);
    return NextResponse.json(
      { error: 'Unable to check address at this time' },
      { status: 500 }
    );
  }
}
