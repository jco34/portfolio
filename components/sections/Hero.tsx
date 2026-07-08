"use client";

import { motion } from "motion/react";
import { GlassButton } from "@/components/ui/GlassButton";
import { FloatingBlob } from "@/components/decor/FloatingBlob";
import { LiquidMetalBackdrop } from "@/components/decor/LiquidMetalBackdrop";
import { fadeUp, stagger } from "@/lib/motion";
import { profile } from "@/content/profile";
import { Download } from "lucide-react";

export function Hero() {
  return (
    <section className="relative z-10 flex min-h-dvh flex-col justify-center overflow-hidden pt-40 pb-24 sm:pt-48">
      {/* Liquid-metal circles, sized to sit just behind the copy and CTA. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[94vw] max-w-[920px] -translate-x-1/2 -translate-y-1/2"
        style={{ height: 400 }}
      >
        <LiquidMetalBackdrop className="h-full w-full" />
        {/* Scrim: softens the shimmer under the text so the white heading and
            button keep their contrast. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_center,rgba(20,20,20,0.62)_0%,rgba(20,20,20,0.25)_55%,transparent_100%)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
      >
        <FloatingBlob preset="sphere" size={260} position={{ top: -40, left: "6%" }} duration={9} />
        <FloatingBlob preset="sphere" size={150} position={{ top: 90, left: "22%" }} rotate={20} duration={7} />
        <FloatingBlob preset="sphere" size={110} position={{ top: 20, left: "40%" }} rotate={-10} duration={10} />
        <FloatingBlob preset="sphere" size={190} position={{ top: 140, right: "8%" }} rotate={15} duration={8} />
        <FloatingBlob preset="sphere" size={90} position={{ top: 40, right: "22%" }} rotate={30} duration={6} />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.15)}
        className="relative z-10 mx-auto flex max-w-[915px] flex-col items-center gap-6 px-4 text-center"
      >
        <motion.p variants={fadeUp} className="font-display text-fg text-2xl">
          {profile.greeting}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-display text-fg text-[44px] leading-tight font-medium sm:text-[64px] sm:leading-[1.15] lg:text-[75px] lg:leading-[1.25]"
        >
          {profile.headline}
        </motion.h1>
        <motion.div variants={fadeUp}>
          <GlassButton href={profile.cvUrl} icon={<Download size={16} />}>
            Download CV
          </GlassButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
