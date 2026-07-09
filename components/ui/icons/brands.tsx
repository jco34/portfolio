import type { SVGProps } from "react";

type BrandIconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: BrandIconProps) {
  return { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", ...props };
}

export function FacebookIcon(props: BrandIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C16.5 3.06 15.53 3 14.4 3 12 3 10.4 4.44 10.4 7.2v2.4H7.6v3.2h2.8V21h3.1z" />
    </svg>
  );
}

export function GithubIcon(props: BrandIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.3-3.3-1.3-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.8 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.3 4.6-4.5 4.8.4.3.7 1 .7 2v3c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2z" />
    </svg>
  );
}

export function LinkedinIcon(props: BrandIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.9 8.6H3.6V21h3.3V8.6zM5.3 3.2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM21 21h-3.3v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9.9V8.6h3.1v1.7h.1c.4-.8 1.6-1.7 3.2-1.7 3.5 0 4.1 2.3 4.1 5.3V21z" />
    </svg>
  );
}

export function InstagramIcon(props: BrandIconProps) {
  return (
    <svg {...base(props)} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SpotifyIcon(props: BrandIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4a.6.6 0 0 1-.83.2c-2.27-1.39-5.13-1.7-8.5-.93a.6.6 0 1 1-.27-1.17c3.68-.84 6.84-.48 9.4 1.08.28.17.37.54.2.82zm1.22-2.72a.75.75 0 0 1-1.03.25c-2.6-1.6-6.56-2.06-9.63-1.13a.75.75 0 1 1-.43-1.44c3.52-1.06 7.89-.55 10.85 1.28.35.22.46.68.24 1.04zm.11-2.83c-3.12-1.85-8.28-2.02-11.26-1.12a.9.9 0 1 1-.52-1.72c3.42-1.03 9.1-.83 12.7 1.28a.9.9 0 0 1-.92 1.56z" />
    </svg>
  );
}
