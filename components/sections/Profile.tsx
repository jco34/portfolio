import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { PillBadge } from "@/components/ui/PillBadge";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Logo } from "@/components/layout/Logo";
import { GlowOrb } from "@/components/decor/GlowOrb";
import { FloatingBlob } from "@/components/decor/FloatingBlob";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { ArrowUpRight } from "lucide-react";

export function Profile() {
  return (
    <section
      id="who-i-am"
      aria-labelledby="who-i-am-heading"
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-28 sm:px-8 lg:px-16"
    >
      <h2 id="who-i-am-heading" className="sr-only">
        Who I Am
      </h2>

      <div className="relative mx-auto w-full max-w-[1312px]">
        {/* Corner spheres bleed over the glass edges (rendered above the pane
            so they read as sitting on top of the frame, as in the design). */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden sm:block">
          <FloatingBlob
            preset="sphere"
            size={158}
            rotate={90}
            blur={2}
            duration={10}
            position={{ top: -120, right: -76 }}
          />
          <FloatingBlob
            preset="sphere"
            size={108}
            rotate={39}
            blur={4}
            duration={8}
            position={{ bottom: -40, left: -24 }}
          />
        </div>

        <Reveal>
          <div className="glass-backdrop relative overflow-hidden p-5 sm:p-8 lg:p-10">
            <GlowOrb position={{ top: -60, right: "18%" }} />

            <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
              <div className="w-full max-w-[460px] shrink-0 lg:w-[42%]">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name} avatar`}
                  width={527}
                  height={527}
                  className="aspect-square w-full rounded-2xl object-cover"
                  priority
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-8 lg:gap-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <Logo />
                    <span className="font-body text-fg text-2xl font-semibold">
                      {profile.name}
                    </span>
                  </div>
                  <PillBadge>{profile.title}</PillBadge>
                </div>

                <div className="bg-surface-2 outline-edge flex flex-col gap-7.5 rounded-2xl p-6 outline outline-1 -outline-offset-1 sm:p-8">
                  <div className="flex flex-col gap-2.5">
                    <p className="font-body text-fg text-lg">Summary</p>
                    <p className="text-muted font-body text-base leading-6">
                      {profile.summary}
                    </p>
                  </div>

                  <div className="bg-edge h-px w-full" />

                  <div className="flex flex-col gap-2.5">
                    <p className="font-body text-fg text-lg">Contact Information</p>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                        <p className="font-body font-medium text-[#E4E4E6]">Email</p>
                        <p className="font-body break-words text-[#AFB0B6]">
                          {profile.email}
                        </p>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:items-end">
                        <p className="font-body font-medium text-[#E4E4E6]">
                          Phone Number
                        </p>
                        <p className="font-body break-words text-[#AFB0B6]">
                          {profile.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <SocialLinks items={socials} />
                    <a
                      href={profile.projectsDoneHref}
                      className="border-edge rounded-pill inline-flex items-center gap-3.5 border py-2.5 pr-2.5 pl-5"
                    >
                      <span className="font-body text-fg text-sm">Projects Done</span>
                      <span className="bg-chip rounded-pill inline-flex h-9 w-9 items-center justify-center">
                        <ArrowUpRight size={20} className="text-fg" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
