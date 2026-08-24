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

/** One design direction of a project that was built more than once — same
    stack and same content, a different design philosophy. */
export type ProjectVariant = {
  label: string;
  /** Short line describing what makes this direction different. */
  note: string;
  href: string;
  images: string[];
};

export type Project = {
  name: string;
  description: string;
  tech: Tech["id"][];
  href?: string;
  images: string[];
  status?: string;
  /** When present, the card renders a switcher and `href`/`images` above are
      only the initial (first variant's) values. */
  variants?: ProjectVariant[];
};

export type Stat = { value: string; label: string };

export type NavItem = { label: string; href: `#${string}` };
