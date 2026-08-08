import type { Experience, Skill, Service, Faq } from "@/db/schema";
import { getProjects } from "@/lib/projects";
import type { MergedProject } from "@/lib/projects";

import { profileData } from "@/data/profile";
import { experienceData } from "@/data/experience";
import { skillsData } from "@/data/skills";
import { servicesData } from "@/data/services";
import { faqData } from "@/data/faq";
import { socialData, fundingData } from "@/data/social";
import { taglinesData } from "@/data/taglines";

// ── Public row types ────────────────────────────────────────────────────────

export type ExperienceRow = Experience;
export type SkillRow = Skill;
export type ServiceRow = Service;

export type SocialRow = {
  platform: string;
  url: string;
  username: string;
  order: number;
};

export type FundingRow = {
  label: string;
  url: string;
  primary: boolean;
  order: number;
};

// ── Re-export ────────────────────────────────────────────────────────────────

export type { MergedProject };
export { getProjects as getProjectsMerged };

// ── Helpers ──────────────────────────────────────────────────────────────────

export async function getProfile(): Promise<{
  name: string;
  bio: string;
  roles: string[];
  avatarUrl: string;
  resumeUrl: string;
  heroTagline: string | null;
  sectionVisibility: Record<string, boolean>;
  stats: { years: number; repos: number; dsa: number; followers: number };
}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return profileData as any;
}

export async function getExperiences(): Promise<ExperienceRow[]> {
  return experienceData as unknown as ExperienceRow[];
}

export async function getSkills(): Promise<SkillRow[]> {
  return skillsData as unknown as SkillRow[];
}

export async function getServices(): Promise<ServiceRow[]> {
  return servicesData as unknown as ServiceRow[];
}

export type FaqRow = Faq;

export async function getFaqs(): Promise<FaqRow[]> {
  return faqData as unknown as FaqRow[];
}

export async function getSocialLinks(): Promise<SocialRow[]> {
  return socialData as SocialRow[];
}

export async function getFundingLinks(): Promise<FundingRow[]> {
  return fundingData as FundingRow[];
}

export async function getRandomTagline(): Promise<string> {
  const active = taglinesData.filter(t => t.active);
  if (active.length === 0) return "Rise above limits";
  const pick = active[Math.floor(Math.random() * active.length)];
  return pick.text;
}
