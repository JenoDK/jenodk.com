import { NextResponse } from 'next/server';

export async function GET() {
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

