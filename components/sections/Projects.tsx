"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TechStack } from "@/components/ui/TechStack";
import { Blob } from "@/components/decor/Blob";
import { projects } from "@/content/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const PREVIEW_INTERVAL_MS = 3000;

export function Projects() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const project = projects[index];
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewPaused, setIsPreviewPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Reset the image slideshow whenever the active project changes. Adjusting
  // state during render (rather than in an effect) avoids the extra
  // commit-then-effect render pass that cascading setState in useEffect causes.
  const [previewResetIndex, setPreviewResetIndex] = useState(index);
  if (index !== previewResetIndex) {
    setPreviewResetIndex(index);
    setPreviewIndex(0);
  }

  function go(delta: number) {
    setSlide(([current]) => [
      (current + delta + projects.length) % projects.length,
      delta,
    ]);
  }

  // Auto-scroll through a project's preview images so private/internal
  // sites (e.g. the Controtek portal) can be showcased without login access.
  // Respect prefers-reduced-motion: hold on the first preview instead of
  // auto-cycling for visitors who've asked the OS to minimize motion.
  useEffect(() => {
    if (project.images.length <= 1 || isPreviewPaused || shouldReduceMotion)
      return;
    const id = setInterval(() => {
      setPreviewIndex((current) => (current + 1) % project.images.length);
    }, PREVIEW_INTERVAL_MS);
    return () => clearInterval(id);
  }, [project.images.length, isPreviewPaused, shouldReduceMotion]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-28 sm:px-8 lg:px-16"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      <div className="relative mx-auto w-full max-w-[1312px]">
        <Blob
          preset="slab"
          width={336}
          height={262}
          position={{ top: 0, right: "10%" }}
          rotate={25}
          className="pointer-events-none absolute hidden lg:block"
        />
        <div className="relative z-10 flex flex-col items-center gap-12 lg:flex-row">
        <div className="relative flex w-full flex-col gap-10 overflow-hidden lg:max-w-[652px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-4">
                {project.status ? (
                  <span className="font-body inline-flex w-fit items-center gap-2 rounded-pill border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#FBBF24]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]" />
                    {project.status}
                  </span>
                ) : null}
                <h3 className="font-body text-fg text-[32px] font-semibold uppercase sm:text-[44px]">
                  {project.name}
                </h3>
              </div>
              <p className="text-muted font-body text-base leading-6">
                {project.description}
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-body text-[18px] font-medium text-[#F2F2F3] uppercase">
                  Techstack used
                </p>
                <TechStack ids={project.tech} />
              </div>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-edge-2 font-body inline-flex w-fit items-center gap-2 border-b pb-1.5 text-[18px] font-medium text-[#F2F2F3] uppercase"
                >
                  View Project
                  <ArrowUpRight size={20} />
                </a>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex w-full justify-center lg:flex-1">
          <div className="relative w-full max-w-[527px]">
            {/* The image is clipped to a rounded rectangle whose bottom edge
                arches up and over the carousel pill, leaving a uniform gap
                around it — traced pixel-for-pixel from the Figma reference.
                Coordinates are objectBoundingBox fractions of a 527×337 box,
                so the cutout scales with the responsive image. */}
            <svg width="0" height="0" aria-hidden className="absolute">
              <defs>
                <clipPath
                  id="projectCardCutout"
                  clipPathUnits="objectBoundingBox"
                >
                  <path d="M 0.0304,1 L 0.2277,1 C 0.3264,1 0.3719,0.834 0.4402,0.834 L 0.5598,0.834 C 0.6281,0.834 0.6736,1 0.7723,1 L 0.9696,1 Q 1,1 1,0.9525 L 1,0.0475 Q 1,0 0.9696,0 L 0.0304,0 Q 0,0 0,0.0475 L 0,0.9525 Q 0,1 0.0304,1 Z" />
                </clipPath>
              </defs>
            </svg>
            <div
              className="relative aspect-[527/337] w-full"
              style={{ clipPath: "url(#projectCardCutout)" }}
              onMouseEnter={() => setIsPreviewPaused(true)}
              onMouseLeave={() => setIsPreviewPaused(false)}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative h-full w-full"
                >
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={previewIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 h-full w-full"
                    >
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.name}`}
                          className="relative block h-full w-full"
                        >
                          <Image
                            src={project.images[previewIndex]}
                            alt={`${project.name} preview ${previewIndex + 1} of ${project.images.length}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 527px"
                            className="object-cover"
                          />
                        </a>
                      ) : (
                        <Image
                          src={project.images[previewIndex]}
                          alt={`${project.name} preview ${previewIndex + 1} of ${project.images.length}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 527px"
                          className="object-cover"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {project.images.length > 1 ? (
                    <div
                      className="absolute right-4 bottom-4 z-10 flex items-center gap-1.5"
                      aria-hidden
                    >
                      {project.images.map((_, imgIdx) => (
                        <span
                          key={imgIdx}
                          className={`h-1.5 rounded-pill transition-all duration-300 ${
                            imgIdx === previewIndex
                              ? "w-5 bg-[#F2F2F3]"
                              : "w-1.5 bg-[#F2F2F3]/40"
                          }`}
                        />
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Endless carousel controls, floating over the image's bottom
                edge exactly as in the reference. `go()` wraps with modulo so
                the arrows loop forever in either direction. */}
            <div
              className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-4 rounded-pill bg-[#070708] p-2.5 outline outline-1 -outline-offset-1 outline-[#1C1C21]"
              aria-live="polite"
            >
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => go(-1)}
                className="text-fg inline-flex items-center justify-center rounded-pill bg-[#1C1C21] p-3.5 outline outline-1 outline-[#2F2F37] transition-opacity hover:opacity-80"
              >
                <ChevronLeft size={34} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => go(1)}
                className="text-fg inline-flex items-center justify-center rounded-pill bg-[#1C1C21] p-3.5 outline outline-1 outline-[#2F2F37] transition-opacity hover:opacity-80"
              >
                <ChevronRight size={34} strokeWidth={1.4} />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
