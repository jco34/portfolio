import {
  Mail,
  Phone,
  Download,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/ui/icons/brands";
import type { IconId } from "@/types/content";

export type IconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

export const iconMap: Record<IconId, IconComponent> = {
  facebook: FacebookIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  mail: Mail,
  phone: Phone,
  download: Download,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
};
