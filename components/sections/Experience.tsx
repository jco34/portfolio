"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/motion";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { TechStack } from "@/components/ui/TechStack";
import { Tabs } from "@/components/ui/Tabs";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { techstack } from "@/content/techstack";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { certifications } from "@/content/certifications";
import { yearsExperience, techstackBlurb } from "@/content/stats";
import type { ExperienceItem } from "@/types/content";

const tabItems = [
  { id: "work", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
] as const;

const panels: Record<(typeof tabItems)[number]["id"], ExperienceItem[] | typeof education | typeof certifications> = {
  work: experience,
  education,
  certifications,
};

export function Experience() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabItems)[number]["id"]>("work");

  const items = panels[activeTab];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-28 sm:px-8 lg:px-16"
    >
      <h2 id="experience-heading" className="sr-only">
        Experience
      </h2>
      <div className="mx-auto w-full max-w-[1312px]">
        <div className="flex min-w-0 flex-col gap-8 lg:h-[720px] lg:flex-row lg:items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.12)}
            className="glass-backdrop relative flex min-w-0 flex-col gap-5 overflow-hidden p-6 sm:p-8 lg:w-[444px] lg:shrink-0"
          >
            <motion.div variants={fadeUp} className="flex min-w-0 flex-1">
              <StatCard stat={{ value: yearsExperience, label: "Work Experience" }} />
            </motion.div>
            <motion.div variants={fadeUp} className="min-w-0 shrink-0">
              <Card className="flex flex-col gap-5 p-8">
                <TechStack ids={techstack.map((tech) => tech.id)} />
                <div className="flex flex-col gap-2">
                  <p className="font-display text-fg text-2xl font-medium">
                    Techstack
                  </p>
                  <p className="text-faint font-display text-sm leading-[21px]">
                    {techstackBlurb}
                  </p>
                </div>
              </Card>
            </motion.div>
            <motion.div variants={fadeUp} className="flex min-w-0 flex-1">
              <StatCard
                stat={{ value: String(certifications.length), label: "Certifications" }}
              />
            </motion.div>
          </motion.div>

          <div className="glass-backdrop relative flex min-w-0 flex-1 flex-col overflow-hidden p-6 sm:p-10">
            <GlowOrb position={{ top: -60, right: "18%" }} />

            <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-10">
              <div className="shrink-0">
                <Tabs items={[...tabItems]} activeId={activeTab} onChange={(id) => setActiveTab(id as typeof activeTab)} />
              </div>

              <div
                id={`panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                className="bg-surface-2 outline-edge custom-scrollbar relative h-[480px] overflow-y-auto rounded-panel p-6 outline outline-1 -outline-offset-1 sm:h-[560px] sm:p-8 lg:h-auto lg:min-h-0 lg:flex-1"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex flex-col gap-7.5"
                  >
                    {items.length === 0 ? (
                      <p className="text-muted font-body text-base">
                        Nothing to show here yet.
                      </p>
                    ) : (
                      items.map((item, index) => (
                        <div key={index} className="flex flex-col gap-7.5">
                          <TimelineItem item={item} />
                          {index < items.length - 1 ? (
                            <div className="h-px w-full bg-edge" />
                          ) : null}
                        </div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
