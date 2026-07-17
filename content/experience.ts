import type { ExperienceItem } from "@/types/content";

export const experience: ExperienceItem[] = [
  {
    company: "SoluxionLab Inc.",
    role: "Backend Developer",
    start: "Mar 2026",
    end: "Jul 2026",
    groups: [
      {
        project: "Unifyr (Manufacturing Execution System)",
        bullets: [
          "Designed and built 30+ RESTful API endpoints for an inventory and supply chain platform using NestJS, TypeORM, and PostgreSQL, owning API design and data modeling end-to-end.",
          "Authored complete OpenAPI (Swagger) documentation, enabling frontend teams to integrate independently and reducing cross-team rework.",
        ],
      },
      {
        project: "Controtek Site Portal (ERP/CRM)",
        bullets: [
          "Owned the full-stack CRM module (Next.js/TypeScript + Rust/Axum) — 46 REST endpoints, a 7-stage opportunity pipeline with RBAC, weighted forecasting, and 6 analytics dashboards over Supabase (PostgreSQL/TimescaleDB).",
          "Selected and integrated third-party services (Resend, AbstractAPI, Semaphore SMS) and designed the auth model — JWT/HttpOnly sessions, Argon2-hashed OTPs, rate limiting, and audit logging.",
          "Led system design: containerized the multi-service stack with Docker Compose, managed schema migrations, mentored junior developers, and drove an AI-assisted workflow using GitHub Copilot and Claude Code for code generation, refactoring, and review.",
        ],
      },
    ],
  },
  {
    company: "Advanced World Solutions, Inc.",
    role: "Software Developer",
    start: "May 2023",
    end: "Mar 2026",
    groups: [
      {
        project: "APAMAN (Property Management System)",
        bullets: [
          "Improved performance of critical React/TypeScript modules, cutting page load times by ~70% through state-management optimization and API improvements.",
          "Led deployment activities across dev and staging environments and mentored junior developers through code reviews and technical coaching.",
          "Delivered end-to-end features for the desktop-to-web migration; integrated Axios for API calls and Zustand for state management.",
          "Reduced defects in vital components through systematic debugging and Jest testing.",
          "Built responsive UIs with React/TypeScript and Tailwind CSS and developed RESTful APIs with Node.js and Express.js.",
          "Implemented database operations with OracleSQL, MySQL, and PL/SQL; monitored code quality using SonarQube.",
        ],
      },
    ],
  },
];
