import type { Project } from "@/types/content";

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
];
