import type { Project } from "@/db/schema";
import { getCachedRepoData } from "./github-cache";
import { projectsData } from "@/data/projects";

export type MergedProject = Project & {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  homepage: string | null;
  htmlUrl: string | null;
};

export async function getProjects(): Promise<MergedProject[]> {
  const curation = projectsData as unknown as Project[];
  
  const OWNER = "AGASTYA12343534";
  const slugs = curation.map((c) => `${OWNER}/${c.repo}`);
  
  const cacheMap = await getCachedRepoData(slugs);

  return curation.map((c) => {
    const slug = `${OWNER}/${c.repo}`;
    const stats = cacheMap.get(slug);
    
    return {
      ...c,
      stars: stats?.stars ?? 0,
      forks: stats?.forks ?? 0,
      language: stats?.language ?? null,
      description: stats?.description ?? null,
      homepage: stats?.homepage ?? null,
      htmlUrl: stats?.htmlUrl ?? `https://github.com/${slug}`,
    };
  }).sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.order !== b.order) return a.order - b.order;
    return (b.stars ?? 0) - (a.stars ?? 0);
  });
}
