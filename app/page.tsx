import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/decor/SectionDivider";

export default function Home() {
  return (
    <main id="main" className="flex w-full flex-1 flex-col [&>*]:w-full [&>*]:min-w-0">
      <Hero />
      <SectionDivider variant={0} />
      <Profile />
      <SectionDivider variant={1} />
      <Experience />
      <SectionDivider variant={2} />
      <Projects />
      <SectionDivider variant={3} />
      <Contact />
      <SectionDivider variant={4} />
      <Footer />
    </main>
  );
}
