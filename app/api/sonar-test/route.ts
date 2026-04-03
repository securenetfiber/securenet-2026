import { NextRequest, NextResponse } from 'next/server';

const SONAR_ENDPOINT = 'https://securenet.sonar.software/api/graphql';

const QUERIES: Record<string, string> = {
  services: `{
    services(paginator: { page: 1, records_per_page: 50 }) {
      entities {
        id
        name
        type
        amount
        enabled
        application
      }
    }
  }`,

  addresses: `{
    addresses(paginator: { page: 1, records_per_page: 10 }) {
      entities {
        id
        line1
        line2
        city
        subdivision
        zip
        county
        latitude
        longitude
        address_status_id
        serviceable
      }
    }
  }`,

  address_statuses: `{
    address_statuses(paginator: { page: 1, records_per_page: 50 }) {
      entities {
        id
        name
      }
    }
  }`,

  account_statuses: `{
    account_statuses(paginator: { page: 1, records_per_page: 50 }) {
      entities {
        id
        name
        color
        icon
        activates_account
      }
    }
  }`,
};

async function querySonar(query: string) {
  const apiKey = process.env.SONAR_API_KEY;
  console.log('SONAR_API_KEY present:', !!apiKey, 'length:', apiKey?.length ?? 0);
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

export async function GET(request: NextRequest) {
  const test = request.nextUrl.searchParams.get('test');

  if (!test) {
    return NextResponse.json({
      available_tests: Object.keys(QUERIES),
      usage: '/api/sonar-test?test=services',
    });
  }

  const query = QUERIES[test];
  if (!query) {
    return NextResponse.json(
      { error: `Unknown test: ${test}`, available_tests: Object.keys(QUERIES) },
      { status: 400 }
    );
  }

  try {
    const data = await querySonar(query);
    return NextResponse.json({ test, ...data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
