interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

interface StravaActivity {
  id: number;
  name: string;
  distance: number; // meters
  moving_time: number; // seconds
  total_elevation_gain: number; // meters
  start_date: string;
  start_date_local: string;
  type: string;
  average_speed: number; // m/s
  start_latlng?: [number, number];
  end_latlng?: [number, number];
  map?: {
    polyline?: string;
    summary_polyline?: string;
  };
}

interface StravaAthlete {
  id: number;
  username?: string;
  firstname: string;
  lastname: string;
}

interface StravaAthleteStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
    achievement_count: number;
  };
  ytd_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
    achievement_count: number;
  };
  all_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
    achievement_count: number;
  };
}

export type SportType = 'Ride' | 'Run' | 'Walk';

export interface SportStats {
  weeklyStreak: number;
  totalKmThisYear: number;
  longestActivity: {
    distance: number;
    date: string;
    name: string;
  };
  maxElevationGain: {
    elevation: number;
    date: string;
    name: string;
  };
  earlyBirdCount: number;
  shortActivitiesCount: number; // Coffee rides for cycling, short runs/walks for others
  averageSpeed: number;
  activityCount: number;
}

export interface ActivityPolyline {
  summaryPolyline: string;
  sportType: SportType;
}

interface StravaStats {
  lastUpdated: string;
  statsBySport: {
    Ride: SportStats;
    Run: SportStats;
    Walk: SportStats;
  };
  activityPolylines?: ActivityPolyline[];
}

export async function refreshAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string> {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const data: StravaTokenResponse = await response.json();
  return data.access_token;
}

function calculateStatsForSport(
  activities: StravaActivity[],
  sportType: SportType,
  athleteStats: StravaAthleteStats | null
): SportStats {
  // Filter activities by sport type
  const filteredActivities = activities.filter((a) => {
    if (sportType === 'Ride') {
      return a.type === 'Ride' || a.type === 'VirtualRide';
    }
    return a.type === sportType;
  });

  if (filteredActivities.length === 0) {
    return {
      weeklyStreak: 0,
      totalKmThisYear: 0,
      longestActivity: { distance: 0, date: '', name: '' },
      maxElevationGain: { elevation: 0, date: '', name: '' },
      earlyBirdCount: 0,
      shortActivitiesCount: 0,
      averageSpeed: 0,
      activityCount: 0,
    };
  }

  // Calculate total km - use athlete stats for rides if available
  let totalKmThisYear = 0;
  if (sportType === 'Ride' && athleteStats?.ytd_ride_totals?.distance) {
    totalKmThisYear = athleteStats.ytd_ride_totals.distance / 1000;
  } else {
    totalKmThisYear = filteredActivities.reduce(
      (sum, activity) => sum + activity.distance / 1000,
      0
    );
  }

  const longestActivity = filteredActivities.reduce(
    (max, activity) => (activity.distance > max.distance ? activity : max),
    filteredActivities[0]
  );

  const maxElevationGain = filteredActivities.reduce(
    (max, activity) =>
      activity.total_elevation_gain > max.total_elevation_gain ? activity : max,
    filteredActivities[0]
  );

  // Calculate weekly streak
  let weeklyStreak = 0;
  if (filteredActivities.length > 0) {
    const mostRecentActivity = filteredActivities.reduce((latest, activity) => {
      const activityDate = new Date(activity.start_date_local);
      const latestDate = new Date(latest.start_date_local);
      return activityDate > latestDate ? activity : latest;
    }, filteredActivities[0]);

    const mostRecentActivityDate = new Date(mostRecentActivity.start_date_local);
    const dayOfWeek = mostRecentActivityDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const startWeekStart = new Date(mostRecentActivityDate);
    startWeekStart.setDate(startWeekStart.getDate() - daysToMonday);
    startWeekStart.setHours(0, 0, 0, 0);

    for (let weekOffset = 0; weekOffset < 52; weekOffset++) {
      const weekStart = new Date(startWeekStart);
      weekStart.setDate(weekStart.getDate() - weekOffset * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const hasActivity = filteredActivities.some((activity) => {
        const activityDate = new Date(activity.start_date_local);
        return activityDate >= weekStart && activityDate < weekEnd;
      });

      if (hasActivity) {
        weeklyStreak++;
      } else {
        break;
      }
    }
  }

  // Early bird activities (before 7am)
  const earlyBirdCount = filteredActivities.filter((activity) => {
    const activityDate = new Date(activity.start_date_local);
    return activityDate.getHours() < 7;
  }).length;

  // Short activities (under 20km for rides, under 5km for runs/walks)
  const shortDistanceThreshold = sportType === 'Ride' ? 20 : 5;
  const shortActivitiesCount = filteredActivities.filter(
    (activity) => activity.distance / 1000 < shortDistanceThreshold
  ).length;

  // Average speed
  const totalSpeed = filteredActivities.reduce(
    (sum, activity) => sum + activity.average_speed,
    0
  );
  const averageSpeed =
    filteredActivities.length > 0 ? totalSpeed / filteredActivities.length : 0;

  return {
    weeklyStreak,
    totalKmThisYear: Math.round(totalKmThisYear * 10) / 10,
    longestActivity: {
      distance: Math.round((longestActivity.distance / 1000) * 10) / 10,
      date: longestActivity.start_date_local,
      name: longestActivity.name,
    },
    maxElevationGain: {
      elevation: Math.round(maxElevationGain.total_elevation_gain),
      date: maxElevationGain.start_date_local,
      name: maxElevationGain.name,
    },
    earlyBirdCount,
    shortActivitiesCount,
    averageSpeed: Math.round((averageSpeed * 3.6) * 10) / 10, // Convert m/s to km/h
    activityCount: filteredActivities.length,
  };
}

export async function fetchStravaStats(
  accessToken: string
): Promise<StravaStats> {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1).toISOString();
  const now = new Date().toISOString();

  // Fetch athlete info to get athlete ID
  const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!athleteResponse.ok) {
    throw new Error('Failed to fetch athlete data: ' + await athleteResponse.text());
  }

  const athlete: StravaAthlete = await athleteResponse.json();

  // Fetch athlete stats (aggregated stats from Strava)
  let athleteStats: StravaAthleteStats | null = null;
  try {
    const statsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athlete.id}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (statsResponse.ok) {
      athleteStats = await statsResponse.json();
    }
  } catch (error) {
    console.warn('Failed to fetch athlete stats:', error);
  }

  // Fetch activities for current year
  const activitiesResponse = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=${Math.floor(
      new Date(startOfYear).getTime() / 1000
    )}&per_page=200`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!activitiesResponse.ok) {
    throw new Error('Failed to fetch activities: ' + await activitiesResponse.text());
  }

  const activities: StravaActivity[] = await activitiesResponse.json();

  // Calculate stats for each sport type
  const statsBySport = {
    Ride: calculateStatsForSport(activities, 'Ride', athleteStats),
    Run: calculateStatsForSport(activities, 'Run', null),
    Walk: calculateStatsForSport(activities, 'Walk', null),
  };

  // Extract activity polylines for route visualization
  const activityPolylines: ActivityPolyline[] = activities
    .filter((activity) => {
      const sportType = activity.type === 'Ride' || activity.type === 'VirtualRide' 
        ? 'Ride' 
        : activity.type === 'Run' 
        ? 'Run' 
        : activity.type === 'Walk' 
        ? 'Walk' 
        : null;
      return sportType && activity.map?.summary_polyline;
    })
    .map((activity) => {
      const sportType = activity.type === 'Ride' || activity.type === 'VirtualRide' 
        ? 'Ride' 
        : activity.type === 'Run' 
        ? 'Run' 
        : 'Walk';
      return {
        summaryPolyline: activity.map!.summary_polyline!,
        sportType: sportType as SportType,
      };
    });

  return {
    lastUpdated: now,
    statsBySport,
    activityPolylines,
  };
}

export type { StravaActivity, StravaStats };

