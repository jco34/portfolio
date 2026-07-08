import { Logo } from "@/components/layout/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { nav } from "@/content/nav";
import { footerSocials } from "@/content/socials";

export function Footer() {
  return (
    <footer className="bg-surface relative z-10 flex flex-col items-center gap-10 px-4 py-16 text-center">
      <Logo />
      <p className="text-fg/50 font-body max-w-[382px] text-[17px]">
        Full-Stack Developer building scalable web applications and robust APIs
        with React, Next.js, and Node.js.
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
        {nav.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="font-body text-fg text-sm">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <SocialLinks items={footerSocials} />
    </footer>
  );
}
