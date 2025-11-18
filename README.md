# Jeno De Keyzer - Personal Website

Professional portfolio website built with Next.js 14, featuring bilingual support (Dutch/English), Strava stats integration, and modern animations.

## Features

- 🌍 Bilingual support (Dutch/English)
- 🎨 Dark/Light mode toggle
- 📊 Live Strava statistics with fallback caching
- 💼 Professional experience timeline
- 🚀 Projects portfolio with filtering
- 🛠️ Skills showcase
- 📱 Fully responsive design
- ⚡ Optimized performance

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl
- **Animation:** framer-motion
- **Charts:** recharts
- **Maps:** react-leaflet
- **Deployment:** Docker + GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   STRAVA_CLIENT_ID=your_client_id
   STRAVA_CLIENT_SECRET=your_client_secret
   STRAVA_REDIRECT_URI=http://localhost:3000/api/strava/callback
   STRAVA_AUTH_SECRET=your_secure_random_secret_token
   STRAVA_ATHLETE_ID=your_strava_athlete_id
   GITHUB_TOKEN=your_github_token
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   
   **Security Notes:**
   - `STRAVA_AUTH_SECRET`: A secure random token (e.g., generate with `openssl rand -hex 32`) required to authorize Strava. This prevents unauthorized users from hijacking your Strava authorization.
   - `STRAVA_ATHLETE_ID`: Your Strava athlete ID (found in your Strava profile URL or after first authorization). This ensures only your account can be authorized.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Docker

Build the Docker image:
```bash
docker build -t jenodk-website .
```

Run the container:
```bash
docker run -d \
  --name jenodk-website \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --env-file .env \
  jenodk-website
```

### GitHub Actions

The repository includes a GitHub Actions workflow that automatically builds and deploys to Hetzner on push to main.

Required secrets:
- `HETZNER_HOST`: Your Hetzner server IP or hostname
- `HETZNER_USER`: SSH username
- `HETZNER_SSH_KEY`: Private SSH key for deployment

### Nginx Configuration

See `nginx.conf.example` for the Nginx configuration. The configuration ensures:
- Root path (`/`) serves the Next.js website
- `/fantasy-league/` proxies to the Fantasy League app
- `/sba/` proxies to Spring Boot Admin
- `/stravats` serves the Stravats Angular app

**Important:** The `/fantasy-league/` location block must be defined BEFORE the `/` location block in nginx config.

## Strava Integration

The Strava stats are fetched live using the Strava API with automatic fallback to cached data if the API request fails. The cache is stored in `data/strava-cache.json` and is automatically updated on successful API calls.

### Initial Setup (One-Time)

1. **Create a Strava App:**
   - Go to https://www.strava.com/settings/api
   - Create a new application
   - Set the **Authorization Callback Domain** to `localhost` (for development) or your production domain

2. **Get Your Strava Athlete ID (First Time Only):**
   - You can find your athlete ID by visiting your Strava profile and checking the URL (e.g., `https://www.strava.com/athletes/12345678` where `12345678` is your athlete ID)
   - Alternatively, you can temporarily authorize without `STRAVA_ATHLETE_ID` set, and it will be logged in the console
   - Add `STRAVA_ATHLETE_ID=your_athlete_id` to your `.env.local` file

3. **Authorize the Application:**
   - Visit `/api/strava/auth?secret=YOUR_STRAVA_AUTH_SECRET` in your browser (e.g., `http://localhost:3000/api/strava/auth?secret=your_secure_random_secret_token`)
   - **Security:** The `secret` parameter must match your `STRAVA_AUTH_SECRET` environment variable
   - You'll be redirected to Strava to authorize the application
   - After authorization, the system will verify that the authorized account matches your `STRAVA_ATHLETE_ID`
   - If verification passes, the refresh token will be automatically saved to `data/strava-tokens.json`
   - If verification fails (wrong athlete ID), the authorization will be rejected for security

4. **That's it!** The refresh token is now saved and will be used automatically. The access token is refreshed automatically as needed.

**Security Features:**
- **Secret Token Protection:** Only requests with the correct `STRAVA_AUTH_SECRET` can initiate authorization
- **Athlete ID Verification:** The system verifies that only your Strava account can be authorized

**Note:** The refresh token is stored in `data/strava-tokens.json` (which is gitignored). You can also set `STRAVA_REFRESH_TOKEN` in your `.env.local` file if you prefer, but the automated OAuth flow is recommended.

## Project Structure

```
jenodk.com/
├── app/
│   ├── [locale]/          # Localized pages
│   └── api/               # API routes
├── components/           # React components
├── lib/                  # Utilities and data
├── messages/             # i18n translations
├── public/               # Static assets
└── data/                 # Data files (Strava cache)
```

## License

Private project - All rights reserved

