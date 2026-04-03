import { NextRequest, NextResponse } from 'next/server';

const SONAR_ENDPOINT = 'https://securenet.sonar.software/api/graphql';

interface SonarAddress {
  id: string;
  line1: string;
  line2: string | null;
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

// Strip city, state, and zip from user input so general_search only gets the
// street portion. Sonar's general_search breaks when state abbrevs or zips
// are included (e.g. "410 Kenna Dr South Charleston WV 25309" returns nothing,
// but "410 Kenna Dr" works fine).
function extractStreet(input: string): string {
  let cleaned = input.trim();

  // Remove zip code (5 or 9 digit) from end
  cleaned = cleaned.replace(/\s+\d{5}(-\d{4})?\s*$/, '');

  // Remove state abbreviation from end (only known US states, not "Dr", "St", etc.)
  const states = /[,\s]+(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC)\s*$/i;
  cleaned = cleaned.replace(states, '');

  // Remove known city names from end (covers SecureNet service areas)
  const cities = [
    'south charleston', 'nitro', 'dunbar', 'st albans', 'saint albans',
    'danville', 'charleston', 'cross lanes', 'sissonville', 'jefferson',
  ];
  const lower = cleaned.toLowerCase();
  for (const city of cities) {
    if (lower.endsWith(city)) {
      cleaned = cleaned.slice(0, -city.length).replace(/[,\s]+$/, '');
      break;
    }
  }

  return cleaned.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawAddress = body.address?.trim();

    if (!rawAddress) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    const street = extractStreet(rawAddress);
    const escaped = street.replace(/"/g, '\\"');

    const query = `{
      addresses(
        general_search: "${escaped}"
        paginator: { page: 1, records_per_page: 10 }
      ) {
        entities {
          id
          line1
          line2
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
      const parts = [serviceable.line1];
      if (serviceable.line2) parts.push(serviceable.line2);
      parts.push(`${serviceable.city}, ${state} ${serviceable.zip}`);
      return NextResponse.json({
        serviceable: true,
        status: 'serviceable',
        address: parts.join(', '),
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
