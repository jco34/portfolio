import type { Project, ProjectVariant } from "@/types/content";

// KME was designed twice on purpose: two complete front ends over the same
// stack and the same content, so the client could choose a direction rather
// than approve the only one on offer. Design 01 stays the card's default.
const kmeDesigns: ProjectVariant[] = [
  {
    label: "Design 01",
    note: "Editorial blueprint sheet",
    href: "https://kme-prototype-1.vercel.app/",
    images: [
      "/images/projects/kme-1-preview.jpg",
      "/images/projects/kme-2-preview.jpg",
      "/images/projects/kme-3-preview.jpg",
    ],
  },
  {
    label: "Design 02",
    note: "Cinematic full-bleed",
    href: "https://kme-prototype-2.vercel.app/",
    images: [
      "/images/projects/kme-alt-1-preview.jpg",
      "/images/projects/kme-alt-2-preview.jpg",
      "/images/projects/kme-alt-3-preview.jpg",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Unifyr",
    description:
      "A manufacturing execution system for inventory and supply chain management. I designed and built 30+ RESTful API endpoints with NestJS, TypeORM, and PostgreSQL — owning API design and data modeling end-to-end — and authored complete OpenAPI (Swagger) documentation so frontend teams could integrate independently.",
    tech: ["typescript", "nodejs", "postgresql", "docker", "git"],
    images: [
      "/images/projects/unifyr-1-preview.png",
      "/images/projects/unifyr-2-preview.png",
      "/images/projects/unifyr-3-preview.png",
    ],
  },
  {
    name: "Controtek Site Portal",
    description:
      "A full-stack ERP/CRM platform. I owned the CRM module (Next.js/TypeScript + Rust/Axum) — 46 REST endpoints, a 7-stage opportunity pipeline with RBAC, weighted forecasting, and 6 analytics dashboards over Supabase (PostgreSQL/TimescaleDB). I designed the auth model (JWT/HttpOnly sessions, Argon2-hashed OTPs, rate limiting, audit logging) and containerized the multi-service stack with Docker Compose.",
    tech: ["typescript", "nextjs", "react", "postgresql", "docker"],
    href: "https://controtek.com/employee-portal/login",
    images: [
      "/images/projects/controtek-1-preview.jpg",
      "/images/projects/controtek-2-preview.jpg",
      "/images/projects/controtek-3-preview.jpg",
      "/images/projects/controtek-4-preview.jpg",
    ],
  },
  {
    name: "APAMAN",
    description:
      "A property management system migrated from desktop to web. I improved performance of critical React/TypeScript modules — cutting page load times by ~70% through state-management optimization and API improvements — delivered end-to-end migration features with Axios and Zustand, and hardened vital components through systematic debugging and Jest testing.",
    tech: ["react", "typescript", "tailwindcss", "nodejs", "javascript"],
    images: [
      "/images/projects/apaman-1-preview.jpg",
      "/images/projects/apaman-2-preview.jpg",
      "/images/projects/apaman-3-preview.jpg",
    ],
  },
  {
    name: "KME Design and Construction",
    status: "Work in progress",
    description:
      "A marketing-site prototype for a Filipino general contractor working across vertical builds (office towers, condominiums) and horizontal infrastructure (roads, bridges, flyovers). I built the full front end with the Next.js App Router, React, and Tailwind CSS — a bold type system, a filterable selected-work grid, and dedicated projects, services, careers, team, and news sections. I shipped it as two complete design directions over the same stack and content, so the client could choose a philosophy instead of approving the only option.",
    tech: ["nextjs", "react", "typescript", "tailwindcss"],
    href: kmeDesigns[0].href,
    images: kmeDesigns[0].images,
    variants: kmeDesigns,
  },
];
