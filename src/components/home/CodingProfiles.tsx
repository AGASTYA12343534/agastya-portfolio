import { ArrowUpRight, RefreshCw, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CodeforcesIcon } from "@/components/brand/CodeforcesIcon";
import { LeetCodeIcon } from "@/components/brand/LeetCodeIcon";
import { CodeChefIcon } from "@/components/brand/CodeChefIcon";
import {
  getCodeforcesProfile,
  getLeetCodeProfile,
  getCodeChefProfile,
} from "@/lib/coding-profiles";

function StatRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
      <span className="text-muted text-sm">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-foreground" : "text-muted-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

function formatDate(isoString: string) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export async function CodingProfiles() {
  const [cf, lc, cc] = await Promise.all([
    getCodeforcesProfile(),
    getLeetCodeProfile(),
    getCodeChefProfile(),
  ]);

  return (
    <Section id="coding-profiles" className="scroll-mt-24">
      <Reveal>
        <div className="flex items-center justify-between">
          <SectionHeading number="06" eyebrow="Profiles" title="Coding Profiles" />
          <div className="flex items-center gap-2 text-muted text-xs">
            <RefreshCw className="size-3" aria-hidden />
            <span>Live Data</span>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Codeforces */}
        <Reveal delay={0} className="h-full">
          <Card className="group relative flex h-full flex-col p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-surface-2 border-border grid size-12 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110">
                  <CodeforcesIcon className="size-6 text-foreground" aria-hidden />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold tracking-tight">Codeforces</h3>
                  <p className="text-muted text-sm">{cf.username}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col flex-1 gap-1">
              <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                <span className="text-muted text-sm">Current Rating</span>
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium transition-transform duration-300 group-hover:scale-105 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                  {cf.rating} ({cf.rank})
                </span>
              </div>
              <StatRow label="Highest Rating" value={cf.maxRating} highlight />
              <StatRow label="Problems Solved" value={cf.problemsSolved} highlight />
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <Clock className="size-3" />
              <span>Updated {formatDate(cf.lastUpdated)}</span>
            </div>

            <div className="mt-6">
              <Button
                href="https://codeforces.com/profile/GymForceNavi"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="w-full justify-between group-hover:border-foreground/30 group-hover:bg-surface-2 transition-colors"
              >
                View Profile
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Button>
            </div>
          </Card>
        </Reveal>

        {/* LeetCode */}
        <Reveal delay={0.05} className="h-full">
          <Card className="group relative flex h-full flex-col p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 group-hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-surface-2 border-border grid size-12 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110">
                  <LeetCodeIcon className="size-6 text-foreground" aria-hidden />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold tracking-tight">LeetCode</h3>
                  <p className="text-muted text-sm">Agastya_06</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col flex-1 gap-1">
              <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                <span className="text-muted text-sm">Contest Rating</span>
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium transition-transform duration-300 group-hover:scale-105 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  {lc.contestRating}
                </span>
              </div>
              <StatRow label="Problems Solved" value={lc.problemsSolved} highlight />
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="flex flex-col items-center bg-surface-2/50 rounded-lg p-2 border border-border/40">
                  <span className="text-xs text-green-400">Easy</span>
                  <span className="text-sm font-semibold">{lc.easy}</span>
                </div>
                <div className="flex flex-col items-center bg-surface-2/50 rounded-lg p-2 border border-border/40">
                  <span className="text-xs text-yellow-400">Med</span>
                  <span className="text-sm font-semibold">{lc.medium}</span>
                </div>
                <div className="flex flex-col items-center bg-surface-2/50 rounded-lg p-2 border border-border/40">
                  <span className="text-xs text-red-400">Hard</span>
                  <span className="text-sm font-semibold">{lc.hard}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <Clock className="size-3" />
              <span>Updated {formatDate(lc.lastUpdated)}</span>
            </div>

            <div className="mt-6">
              <Button
                href="https://leetcode.com/u/Agastya_06/"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="w-full justify-between group-hover:border-foreground/30 group-hover:bg-surface-2 transition-colors"
              >
                View Profile
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Button>
            </div>
          </Card>
        </Reveal>

        {/* CodeChef */}
        <Reveal delay={0.1} className="h-full">
          <Card className="group relative flex h-full flex-col p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 group-hover:shadow-[0_0_30px_-5px_rgba(180,83,9,0.15)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-surface-2 border-border grid size-12 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-110">
                  <CodeChefIcon className="size-6 text-foreground" aria-hidden />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold tracking-tight">CodeChef</h3>
                  <p className="text-muted text-sm">gymgeek_coder</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col flex-1 gap-1">
              <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                <span className="text-muted text-sm">Current Rating</span>
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium transition-transform duration-300 group-hover:scale-105 bg-amber-700/10 text-amber-500 border-amber-700/20">
                  {cc.rating} ({cc.stars})
                </span>
              </div>
              <StatRow label="Highest Rating" value={cc.maxRating} highlight />
              <StatRow label="Problems Solved" value={cc.problemsSolved} highlight />
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <Clock className="size-3" />
              <span>Updated {formatDate(cc.lastUpdated)}</span>
            </div>

            <div className="mt-6">
              <Button
                href="https://www.codechef.com/users/gymgeek_coder"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="w-full justify-between group-hover:border-foreground/30 group-hover:bg-surface-2 transition-colors"
              >
                View Profile
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Button>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

export default CodingProfiles;
