"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import { SpotifyIcon } from "@/components/ui/icons/brands";
import type { NowPlaying as NowPlayingTrack } from "@/lib/spotify";

const POLL_INTERVAL_MS = 30_000;
const INTRO_REVEAL_MS = 5_000;

export function NowPlayingWidget() {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchTrack() {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setTrack(data?.songUrl ? data : null);
      } catch {
        if (!cancelled) setTrack(null);
      }
    }

    fetchTrack();
    const id = setInterval(fetchTrack, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Auto-reveal the invite once the track loads, then settle back down.
  useEffect(() => {
    if (!track || introDone) return;
    setExpanded(true);
    const id = setTimeout(() => {
      setExpanded(false);
      setIntroDone(true);
    }, INTRO_REVEAL_MS);
    return () => clearTimeout(id);
  }, [track, introDone]);

  useEffect(() => {
    if (!playerOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setPlayerOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [playerOpen]);

  if (!track) return null;

  // Spotify track IDs are base62. Validate before dropping it into an iframe
  // src so a malformed/unexpected id can't build a surprising embed URL.
  const embedId = /^[A-Za-z0-9]+$/.test(track.trackId) ? track.trackId : null;

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {playerOpen && embedId ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-backdrop absolute right-0 bottom-full mb-3 w-[min(420px,calc(100vw-2rem))] overflow-hidden p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <a
                href={track.songUrl}
                target="_blank"
                rel="noreferrer"
                className="font-body text-fg/70 hover:text-fg inline-flex items-center gap-1.5 text-xs"
              >
                Open in Spotify
                <ExternalLink size={12} />
              </a>
              <button
                type="button"
                aria-label="Close player"
                onClick={() => setPlayerOpen(false)}
                className="text-fg/70 hover:text-fg"
              >
                <X size={16} />
              </button>
            </div>
            <iframe
              title={`Spotify player: ${track.title}`}
              src={`https://open.spotify.com/embed/track/${embedId}?theme=0`}
              width="100%"
              height="232"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setPlayerOpen((open) => !open)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        aria-label={`${track.isPlaying ? "Now playing" : "Last played"}: ${track.title} by ${track.artist}. Play on Spotify.`}
        className="glass-backdrop group flex items-center gap-3 overflow-hidden rounded-full p-2 shadow-lg"
      >
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
          {track.albumArt ? (
            <Image
              src={track.albumArt}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            <div className="bg-chip h-full w-full" />
          )}
          {track.isPlaying ? (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                animation: shouldReduceMotion ? undefined : "eq-pulse 2s ease-out infinite",
              }}
              aria-hidden
            />
          ) : null}
          <span className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1DB954]">
            <SpotifyIcon size={10} className="text-black" />
          </span>
        </div>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="details"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 180, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex shrink-0 flex-col overflow-hidden pr-4 text-left"
            >
              <span className="font-body text-fg truncate text-xs font-medium whitespace-nowrap">
                Come vibe with me 🎧
              </span>
              <span className="font-body text-muted truncate text-xs whitespace-nowrap">
                {track.title} · {track.artist}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </button>
    </div>
  );
}
