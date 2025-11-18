import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const TOKEN_FILE = join(process.cwd(), 'data', 'strava-tokens.json');

async function saveTokens(tokens: any): Promise<void> {
  try {
    const dataDir = join(process.cwd(), 'data');
    await mkdir(dataDir, { recursive: true });
    await writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save tokens:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?strava_error=${error}`
    );
  }

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const redirectUri = process.env.STRAVA_REDIRECT_URI || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/strava/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Strava credentials not configured' },
      { status: 500 }
    );
  }

  try {
    // Exchange code for tokens
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to exchange code: ${errorText}`);
    }

    const tokens = await response.json();

    // Save tokens to file (we only need refresh_token, but save all for reference)
    await saveTokens({
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      expires_at: tokens.expires_at,
      scope: tokens.scope,
      saved_at: new Date().toISOString(),
    });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?strava_success=true`
    );
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?strava_error=${encodeURIComponent(error.message)}`
    );
  }
}

