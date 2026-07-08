"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { Logo } from "@/components/layout/Logo";
import type { NavItem } from "@/types/content";

// "iPhone glass" panel: bright top-left inset highlight + dark bottom-right inset
// edge + layered ambient depth shadow. Ported from the design's bare HTML.
const GLASS_SHADOW = [
  "-1px -1px 1px rgba(0, 0, 0, 0.23) inset",
  "1px 1px 1px rgba(255, 255, 255, 0.70) inset",
  "-0.5px -0.5px 0px rgba(0, 0, 0, 0.69)",
  "14px 14px 21.2px -3.75px rgba(0, 0, 0, 0.20)",
  "5.9px 5.9px 8.35px -3px rgba(0, 0, 0, 0.19)",
  "2.66px 2.66px 3.76px -2.25px rgba(0, 0, 0, 0.23)",
  "1.21px 1.21px 1.71px -1.5px rgba(0, 0, 0, 0.25)",
  "0.44px 0.44px 0.63px -0.75px rgba(0, 0, 0, 0.26)",
].join(", ");

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

const NAVBAR_OFFSET = 96;

function scrollToSection(href: string) {
  const target = document.querySelector(href);
  if (!(target instanceof HTMLElement)) return;

  // Deferred to the next frame: closing the mobile menu triggers a
  // layoutId-driven layout animation (the active-underline indicator),
  // and Framer Motion's own layout measurement pass resets scroll
  // position mid-frame, which would otherwise clobber this scroll.
  requestAnimationFrame(() => {
    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  });
}

function NavLink({
  item,
  isActive,
  onClick,
  className,
}: {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={item.href}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(item.href);
        onClick?.();
      }}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "font-body relative inline-block px-2.5 py-2.5 text-lg transition-colors",
        isActive ? "text-fg" : "text-[#909090] hover:text-fg",
        className,
      )}
    >
      {item.label}
      {isActive ? (
        <motion.span
          layoutId="nav-underline"
          className="bg-fg absolute inset-x-0 -bottom-0.5 h-0.5"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      ) : null}
    </a>
  );
}

export function Navbar({ items }: { items: NavItem[] }) {
  const activeId = useActiveSection(items.map((item) => item.href.slice(1)));
  const scrolled = useScrolled();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={false}
        animate={scrolled ? "scrolled" : "top"}
        variants={{
          top: { maxWidth: 1312, marginTop: 0, paddingTop: 24, paddingBottom: 24 },
          scrolled: { maxWidth: 1160, marginTop: 14, paddingTop: 14, paddingBottom: 14 },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
        className="relative mx-auto flex items-center justify-between px-6 sm:px-8"
      >
        {/* Glossy glass panel — fades in on scroll so its blur + shadow only
            appear once the bar detaches from the top of the page. */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 -z-10 rounded-[25px]"
          style={{
            background: "rgba(30, 30, 32, 0.72)",
            boxShadow: GLASS_SHADOW,
            backdropFilter: "blur(20px) saturate(160%)",
            WebkitBackdropFilter: "blur(20px) saturate(160%)",
          }}
        />

        <Logo showText />

        <ul className="hidden items-end gap-4 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <NavLink item={item} isActive={activeId === item.href.slice(1)} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="text-fg inline-flex h-10 w-10 items-center justify-center md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-4 mt-2 overflow-hidden rounded-[25px] md:hidden"
            style={{
              background: "rgba(30, 30, 32, 0.82)",
              boxShadow: GLASS_SHADOW,
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}
          >
            <ul className="flex flex-col items-start gap-2 px-4 py-4">
              {items.map((item) => (
                <li key={item.href} className="w-full">
                  <NavLink
                    item={item}
                    isActive={activeId === item.href.slice(1)}
                    onClick={() => setIsOpen(false)}
                    className="block w-full"
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
