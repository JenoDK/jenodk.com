import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const providedSecret = searchParams.get('secret');
  const requiredSecret = process.env.STRAVA_AUTH_SECRET;

  // Require secret token to prevent unauthorized access
  if (!requiredSecret) {
    return NextResponse.json(
      { error: 'STRAVA_AUTH_SECRET not configured. Please set this environment variable.' },
      { status: 500 }
    );
  }

  if (!providedSecret || providedSecret !== requiredSecret) {
    return NextResponse.json(
      { error: 'Unauthorized. A valid secret token is required to authorize Strava.' },
      { status: 401 }
    );
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.STRAVA_REDIRECT_URI || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/strava/callback`;
  const scope = 'activity:read';

  if (!clientId) {
    return NextResponse.json(
      { error: 'STRAVA_CLIENT_ID not configured' },
      { status: 500 }
    );
  }

  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&approval_prompt=force`;

  return NextResponse.redirect(authUrl);
}

