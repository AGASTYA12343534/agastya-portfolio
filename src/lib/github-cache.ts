import { getRepo, getUserStats } from "@/lib/github";

export type CachedRepoStats = {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  homepage: string | null;
  htmlUrl: string | null;
};

function nullStats(slug: string): CachedRepoStats {
  return {
    stars: 0,
    forks: 0,
    language: null,
    description: null,
    homepage: null,
    htmlUrl: `https://github.com/${slug}`,
  };
}

export async function getCachedRepoData(slugs: string[]): Promise<Map<string, CachedRepoStats>> {
  const result = new Map<string, CachedRepoStats>();

  if (slugs.length === 0) return result;

  await Promise.all(
    slugs.map(async (slug) => {
      try {
        const live = await getRepo(slug);
        if (live) {
          result.set(slug, {
            stars: live.stargazers_count,
            forks: live.forks_count,
            language: live.language,
            description: live.description,
            homepage: live.homepage,
            htmlUrl: live.html_url,
          });
        } else {
          result.set(slug, nullStats(slug));
        }
      } catch {
        result.set(slug, nullStats(slug));
      }
    }),
  );

  return result;
}

export type CachedUserStats = {
  followers: number;
  publicRepos: number;
  totalStars: number;
  firstContributionYear: number | null;
};

export async function getCachedUserStats(username: string): Promise<CachedUserStats | null> {
  try {
    const live = await getUserStats(username);
    return live || null;
  } catch {
    return null;
  }
}
