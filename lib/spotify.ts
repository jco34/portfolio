const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type NowPlaying = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  songUrl: string;
  trackId: string;
};

// A Spotify access token is valid for ~1 hour, so cache it and only refresh
// when it is about to expire. Without this every request would perform a fresh
// OAuth exchange, quickly exhausting Spotify's rate limits.
let cachedToken: { value: string; expiresAt: number } | null = null;
const TOKEN_EXPIRY_MARGIN_MS = 60_000;

// Short-lived cache for the resolved track so a burst of client polls (or an
// abusive caller) collapses into a single upstream round-trip.
let cachedNowPlaying: { value: NowPlaying | null; expiresAt: number } | null = null;
const NOW_PLAYING_TTL_MS = 15_000;

// Cap each upstream request. Spotify (or a broken local network) can otherwise
// hang on the TCP connect until undici's ~10s default, blocking the request and
// surfacing a 500. Fail fast and let the caller fall back to cached data.
const FETCH_TIMEOUT_MS = 5_000;

function timedFetch(url: string, options: RequestInit) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await timedFetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!data.access_token) return null;

  const ttlMs = (data.expires_in ?? 3600) * 1000;
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + ttlMs - TOKEN_EXPIRY_MARGIN_MS,
  };
  return cachedToken.value;
}

export async function getNowPlaying(): Promise<NowPlaying | null> {
  if (cachedNowPlaying && cachedNowPlaying.expiresAt > Date.now()) {
    return cachedNowPlaying.value;
  }

  try {
    const track = await fetchNowPlaying();
    cachedNowPlaying = { value: track, expiresAt: Date.now() + NOW_PLAYING_TTL_MS };
    return track;
  } catch (error) {
    // Network blip, timeout, or upstream error. Don't blow up the request —
    // serve the last known track (even if the TTL has lapsed) so the widget
    // stays populated, falling back to null (i.e. "not playing") if we've
    // never had a successful fetch.
    console.error("[spotify] now-playing fetch failed:", error);
    return cachedNowPlaying?.value ?? null;
  }
}

async function fetchNowPlaying(): Promise<NowPlaying | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const headers = { Authorization: `Bearer ${accessToken}` };

  const nowRes = await timedFetch(NOW_PLAYING_URL, { headers, cache: "no-store" });

  if (nowRes.status === 200) {
    const data = await nowRes.json();
    const track = data?.item;
    if (track) {
      return {
        isPlaying: Boolean(data.is_playing),
        title: track.name,
        artist: track.artists?.map((a: { name: string }) => a.name).join(", ") ?? "",
        albumArt: track.album?.images?.[0]?.url ?? null,
        songUrl: track.external_urls?.spotify ?? "",
        trackId: track.id ?? "",
      };
    }
  }

  // Nothing currently playing — fall back to the most recently played track.
  const recentRes = await timedFetch(RECENTLY_PLAYED_URL, { headers, cache: "no-store" });
  if (!recentRes.ok) return null;

  const recentData = await recentRes.json();
  const track = recentData?.items?.[0]?.track;
  if (!track) return null;

  return {
    isPlaying: false,
    title: track.name,
    artist: track.artists?.map((a: { name: string }) => a.name).join(", ") ?? "",
    albumArt: track.album?.images?.[0]?.url ?? null,
    songUrl: track.external_urls?.spotify ?? "",
    trackId: track.id ?? "",
  };
}
