import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

// Allow a brief shared cache so repeated polls are served without re-hitting
// Spotify. Matches the in-process TTL in lib/spotify.ts.
const CACHE_CONTROL = "public, max-age=15, s-maxage=15, stale-while-revalidate=30";

export async function GET() {
  const track = await getNowPlaying();

  if (!track) {
    return NextResponse.json(
      { isPlaying: false },
      { status: 200, headers: { "Cache-Control": CACHE_CONTROL } },
    );
  }

  return NextResponse.json(track, {
    headers: { "Cache-Control": CACHE_CONTROL },
  });
}
