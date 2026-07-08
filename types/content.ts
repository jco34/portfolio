export type IconId =
  | "facebook"
  | "github"
  | "linkedin"
  | "instagram"
  | "mail"
  | "phone"
  | "download"
  | "arrow-right"
  | "arrow-up-right"
  | "chevron-left"
  | "chevron-right";

export type SocialLink = { label: string; href: string; icon: IconId };

export type Tech = { id: string; label: string; icon: string };

export type Profile = {
  name: string;
  initials: string;
  title: string;
  headline: string;
  greeting: string;
  summary: string;
  email: string;
  phone: string;
  cvUrl: string;
  avatar: string;
  projectsDoneHref: string;
};

export type ExperienceGroup = {
  project?: string;
  bullets: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  groups: ExperienceGroup[];
};

export type EducationItem = {
  school: string;
  degree: string;
  start: string;
  end: string;
  notes?: string[];
};

export type CertificationItem = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  logo?: string;
};

export type Project = {
  name: string;
  description: string;
  tech: Tech["id"][];
  href?: string;
  images: string[];
};

export type Stat = { value: string; label: string };

export type NavItem = { label: string; href: `#${string}` };
