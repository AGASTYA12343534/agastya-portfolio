import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { AnimatedStat } from "./AnimatedStat";
import { cn } from "@/utils/cn";

export type AboutProfile = {
  bio: string;
  stats: { years: number; repos: number; dsa: number; followers: number };
  name?: string;
  avatarUrl?: string;
};

type StatGridProps = {
  stats: AboutProfile["stats"];
  className?: string;
};

function StatGrid({ stats, className }: StatGridProps) {
  const items: { value: number; label: string; suffix: string }[] = [
    { value: stats.years, label: "Years of Learning & Building", suffix: "+" },
    { value: stats.dsa, label: "DSA Problems Solved", suffix: "+" },
    { value: stats.repos, label: "Public Repositories", suffix: "+" },
  ];

  return (
    // 3-column layout on medium screens and up, single column on mobile.
    <Card
      className={cn(
        "divide-border mt-12 grid grid-cols-1 divide-y p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0",
        className,
      )}
    >
      {items.map(({ value, label, suffix }, i) => (
        <AnimatedStat key={label} value={value} label={label} suffix={suffix} delay={0.1 + i * 0.08} />
      ))}
    </Card>
  );
}

export function About({ profile }: { profile: AboutProfile }) {
  return (
    <Section id="about" className="scroll-mt-24">
      <div>
        <Reveal>
          <SectionHeading number="02" eyebrow="About" title="A bit about me" />
        </Reveal>

        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:gap-14">
          <Reveal delay={0.08} className="min-w-0 flex-1">
            <div className="max-w-2xl space-y-4">
              {profile.bio
                .split(/\n\s*\n/)
                .map((para) => para.trim())
                .filter(Boolean)
                .map((para, i) => (
                  <p
                    key={`bio-${i}`}
                    className={
                      i === 0
                        ? "text-foreground/90 text-xl leading-relaxed font-medium sm:text-2xl"
                        : "text-muted text-base leading-relaxed sm:text-lg"
                    }
                  >
                    {para}
                  </p>
                ))}
            </div>
          </Reveal>

          {profile.avatarUrl && (
            <Reveal delay={0.14} className="mx-auto shrink-0 md:mx-0">
              <Parallax strength={28} className="group relative">
                {/* Gradient halo behind the portrait */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-4xl bg-(image:--gradient-brand) opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-45"
                />
                <div className="border-border relative aspect-4/5 w-56 overflow-hidden rounded-3xl border backdrop-blur-sm sm:w-64">
                  <Image
                    src={profile.avatarUrl}
                    alt={`Portrait of ${profile.name ?? "Agastya"}`}
                    fill
                    sizes="(max-width: 640px) 224px, 256px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </Parallax>
            </Reveal>
          )}
        </div>

        <StatGrid stats={profile.stats} />
      </div>
    </Section>
  );
}

export default About;
