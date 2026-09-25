import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

const SONAR_ENDPOINT = 'https://securenet.sonar.software/api/graphql';
const SONAR_TIMEOUT_MS = 8000;
const MAX_INPUT_LENGTH = 200;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60000;

interface SonarAddress {
  id: string;
  line1: string;
  line2: string | null;
  city: string;
  subdivision: string;
  zip: string;
  serviceable: boolean;
}

// The search term is passed as a GraphQL variable, never spliced into the
// query string, so quotes and backslashes in user input can't break out.
const ADDRESS_QUERY = `query AddressCheck($search: String) {
  addresses(
    general_search: $search
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

async function querySonar(query: string, variables: Record<string, unknown>) {
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
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(SONAR_TIMEOUT_MS),
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

const STATE_PATTERN = /[,\s]+(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|DC)\s*$/i;
const ZIP_PATTERN = /\s+(\d{5})(-\d{4})?\s*$/;

// Known city names in SecureNet service areas
const KNOWN_CITIES = [
  'south charleston', 'nitro', 'dunbar', 'st albans', 'saint albans',
  'danville', 'charleston', 'cross lanes', 'sissonville', 'jefferson',
];

// Strip city, state, and zip from user input so general_search only gets the
// street portion. Sonar's general_search breaks when state abbrevs or zips
// are included (e.g. "410 Kenna Dr South Charleston WV 25309" returns nothing,
// but "410 Kenna Dr" works fine).
function extractStreet(input: string): string {
  let cleaned = input.trim();

  // Remove zip code (5 or 9 digit) from end
  cleaned = cleaned.replace(/\s+\d{5}(-\d{4})?\s*$/, '');

  // Remove state abbreviation from end (only known US states, not "Dr", "St", etc.)
  cleaned = cleaned.replace(STATE_PATTERN, '');

  // Remove known city names from end (covers SecureNet service areas)
  const lower = cleaned.toLowerCase();
  for (const city of KNOWN_CITIES) {
    if (lower.endsWith(city)) {
      cleaned = cleaned.slice(0, -city.length).replace(/[,\s]+$/, '');
      break;
    }
  }

  return cleaned.trim();
}

function normalizeCity(city: string): string {
  return city
    .toLowerCase()
    .replace(/[.,]/g, '')
    .replace(/^saint\s+/, 'st ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Pull the city and zip the user typed (if any) so we can prefer matching
// results when the same street name exists in more than one town.
function extractLocationHints(input: string): { city?: string; zip?: string } {
  let rest = input.trim();
  let zip: string | undefined;

  const zipMatch = rest.match(ZIP_PATTERN);
  if (zipMatch) {
    zip = zipMatch[1];
    rest = rest.slice(0, zipMatch.index).trim();
  }
  rest = rest.replace(STATE_PATTERN, '').trim();

  let city: string | undefined;
  const lower = rest.toLowerCase();
  for (const known of KNOWN_CITIES) {
    if (lower.endsWith(known)) {
      city = known;
      break;
    }
  }
  // "123 Main St, Hurricane" style input: take the part after the last comma
  if (!city && rest.includes(',')) {
    const tail = rest.slice(rest.lastIndexOf(',') + 1).trim();
    if (tail && !/\d/.test(tail)) city = tail;
  }

  return {
    city: city ? normalizeCity(city) : undefined,
    zip,
  };
}

function pickServiceable(
  addresses: SonarAddress[],
  hints: { city?: string; zip?: string },
): SonarAddress | undefined {
  const zipMatches = (a: SonarAddress) => !hints.zip || a.zip?.slice(0, 5) === hints.zip;
  const cityMatches = (a: SonarAddress) => !hints.city || normalizeCity(a.city ?? '') === hints.city;
  const serviceable = addresses.filter((a) => a.serviceable === true);

  if (hints.zip || hints.city) {
    const tiers: ((a: SonarAddress) => boolean)[] = [
      (a) => zipMatches(a) && cityMatches(a),
    ];
    if (hints.zip) tiers.push((a) => a.zip?.slice(0, 5) === hints.zip);
    if (hints.city) tiers.push((a) => normalizeCity(a.city ?? '') === hints.city);

    for (const tier of tiers) {
      const match = serviceable.find(tier);
      if (match) return match;
    }
  }

  return serviceable[0];
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  if (!checkRateLimit(`address-check:${getClientIp(req)}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    );
  }

  let rawAddress: string;
  try {
    const body = await req.json();
    rawAddress = typeof body?.address === 'string' ? body.address.trim() : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!rawAddress) {
    return NextResponse.json(
      { error: 'Address is required' },
      { status: 400 }
    );
  }

  if (rawAddress.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: 'Address is too long' },
      { status: 400 }
    );
  }

  try {
    const street = extractStreet(rawAddress);
    if (!street) {
      return NextResponse.json({ serviceable: false, status: 'not_found' });
    }

    const data = await querySonar(ADDRESS_QUERY, { search: street });
    const addresses: SonarAddress[] = data?.data?.addresses?.entities ?? [];

    if (addresses.length === 0) {
      return NextResponse.json({
        serviceable: false,
        status: 'not_found',
      });
    }

    const serviceable = pickServiceable(addresses, extractLocationHints(rawAddress));

    if (serviceable) {
      const state = formatSubdivision(serviceable.subdivision);
      const parts = [serviceable.line1];
      if (serviceable.line2) parts.push(serviceable.line2);
      parts.push(`${serviceable.city}, ${state} ${serviceable.zip}`);
      return NextResponse.json({
        serviceable: true,
        status: 'serviceable',
        address: parts.join(', '),
        state,
        line1: serviceable.line1,
        line2: serviceable.line2 || '',
        city: serviceable.city,
        zip: serviceable.zip,
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
