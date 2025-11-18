import { NextResponse } from 'next/server';
import { refreshAccessToken, fetchStravaStats } from '@/lib/strava';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const CACHE_FILE = join(process.cwd(), 'data', 'strava-cache.json');
const TOKEN_FILE = join(process.cwd(), 'data', 'strava-tokens.json');

async function readCache(): Promise<any> {
  try {
    const data = await readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function writeCache(data: any): Promise<void> {
  try {
    const cacheDir = join(process.cwd(), 'data');
    await mkdir(cacheDir, { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write cache:', error);
  }
}

function isCacheExpired(cached: any): boolean {
  if (!cached || !cached.lastUpdated) {
    return true;
  }

  const cacheDate = new Date(cached.lastUpdated);
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

  return cacheDate < oneWeekAgo;
}

async function getRefreshToken(): Promise<string | null> {
  // First try environment variable (for backwards compatibility)
  if (process.env.STRAVA_REFRESH_TOKEN) {
    return process.env.STRAVA_REFRESH_TOKEN;
  }

  // Then try reading from file (automated OAuth flow)
  try {
    const data = await readFile(TOKEN_FILE, 'utf-8');
    const tokens = JSON.parse(data);
    return tokens.refresh_token || null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === 'true';

  // Try to return cached data first (unless force refresh is requested or cache is expired)
  if (!forceRefresh) {
    const cached = await readCache();
    if (cached && !isCacheExpired(cached)) {
      return NextResponse.json({ ...cached, usingCache: true });
    }
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = await getRefreshToken();

  if (!clientId || !clientSecret || !refreshToken) {
    // Return cached data if available (even if expired)
    const cached = await readCache();
    if (cached) {
      return NextResponse.json({ ...cached, usingCache: true });
    }
    return NextResponse.json(
      { error: 'Strava credentials not configured. Visit /api/strava/auth to authorize.' },
      { status: 500 }
    );
  }

  try {
    // Get fresh access token
    const accessToken = await refreshAccessToken(
      clientId,
      clientSecret,
      refreshToken
    );

    // Fetch fresh stats
    const stats = await fetchStravaStats(accessToken);

    // Update cache
    await writeCache(stats);

    return NextResponse.json({ ...stats, usingCache: false });
  } catch (error) {
    console.error('Strava API error:', error);

    // Fallback to cache
    const cached = await readCache();
    if (cached) {
      return NextResponse.json({ ...cached, usingCache: true });
    }

    return NextResponse.json(
      { error: 'Failed to fetch Strava stats' },
      { status: 500 }
    );
  }
}

