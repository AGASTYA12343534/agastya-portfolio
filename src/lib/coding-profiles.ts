import { unstable_cache } from "next/cache";

export type CodeforcesData = {
  username: string;
  rating: string;
  maxRating: string;
  rank: string;
  problemsSolved: string;
  lastUpdated: string;
};

export type LeetCodeData = {
  problemsSolved: string;
  easy: string;
  medium: string;
  hard: string;
  contestRating: string;
  lastUpdated: string;
};

export type CodeChefData = {
  rating: string;
  maxRating: string;
  stars: string;
  problemsSolved: string;
  lastUpdated: string;
};

// Default fallback values
const FALLBACK_CODEFORCES: CodeforcesData = {
  username: "GymForceNavi",
  rating: "1402",
  maxRating: "1556",
  rank: "Specialist",
  problemsSolved: "364",
  lastUpdated: new Date().toISOString(),
};

const FALLBACK_LEETCODE: LeetCodeData = {
  problemsSolved: "296",
  easy: "120",
  medium: "148",
  hard: "28",
  contestRating: "1568",
  lastUpdated: new Date().toISOString(),
};

const FALLBACK_CODECHEF: CodeChefData = {
  rating: "1450",
  maxRating: "1678",
  stars: "3★",
  problemsSolved: "52",
  lastUpdated: new Date().toISOString(),
};

// Revalidate every 24 hours
const REVALIDATE = 86400;

const fetchCodeforcesProfile = unstable_cache(
  async (): Promise<CodeforcesData> => {
    const timestamp = new Date().toISOString();
    
    const [infoRes, statusRes] = await Promise.all([
      fetch("https://codeforces.com/api/user.info?handles=GymForceNavi"),
      fetch("https://codeforces.com/api/user.status?handle=GymForceNavi"),
    ]);

    if (!infoRes.ok || !statusRes.ok) throw new Error("CF fetch failed");

    const infoData = await infoRes.json();
    const statusData = await statusRes.json();

    let rating = FALLBACK_CODEFORCES.rating;
    let maxRating = FALLBACK_CODEFORCES.maxRating;
    let rank = FALLBACK_CODEFORCES.rank;
    let problemsSolved = FALLBACK_CODEFORCES.problemsSolved;

    if (infoData.status === "OK" && infoData.result?.length > 0) {
      const user = infoData.result[0];
      rating = user.rating?.toString() || rating;
      maxRating = user.maxRating?.toString() || maxRating;
      rank = user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : rank;
    } else {
      throw new Error("Invalid CF info data");
    }

    if (statusData.status === "OK" && statusData.result) {
      const solved = new Set();
      statusData.result.forEach((sub: { verdict: string; problem?: { contestId: number; index: string } }) => {
        if (sub.verdict === "OK" && sub.problem?.contestId) {
          solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
      });
      problemsSolved = solved.size.toString();
    } else {
      throw new Error("Invalid CF status data");
    }

    return { username: "GymForceNavi", rating, maxRating, rank, problemsSolved, lastUpdated: timestamp };
  },
  ["codeforces-profile-cache-v1"],
  { revalidate: REVALIDATE }
);

export async function getCodeforcesProfile(): Promise<CodeforcesData> {
  try {
    return await fetchCodeforcesProfile();
  } catch (error) {
    console.error("Codeforces error:", error);
    return { ...FALLBACK_CODEFORCES, lastUpdated: new Date().toISOString() };
  }
}

const fetchLeetCodeProfile = unstable_cache(
  async (): Promise<LeetCodeData> => {
    const timestamp = new Date().toISOString();
    const [contestRes, solvedRes] = await Promise.all([
      fetch("https://alfa-leetcode-api.onrender.com/Agastya_06/contest"),
      fetch("https://alfa-leetcode-api.onrender.com/Agastya_06/solved"),
    ]);

    if (!contestRes.ok || !solvedRes.ok) throw new Error("LC fetch failed");

    const contestData = await contestRes.json();
    const solvedData = await solvedRes.json();

    let contestRating = FALLBACK_LEETCODE.contestRating;
    let problemsSolved = FALLBACK_LEETCODE.problemsSolved;
    let easy = FALLBACK_LEETCODE.easy;
    let medium = FALLBACK_LEETCODE.medium;
    let hard = FALLBACK_LEETCODE.hard;

    if (contestData.contestRating) {
      contestRating = Math.round(contestData.contestRating).toString();
    }

    if (solvedData.solvedProblem !== undefined) {
      problemsSolved = solvedData.solvedProblem.toString();
      easy = solvedData.easySolved?.toString() || easy;
      medium = solvedData.mediumSolved?.toString() || medium;
      hard = solvedData.hardSolved?.toString() || hard;
    } else {
      throw new Error("Invalid LC solved data");
    }

    return { problemsSolved, easy, medium, hard, contestRating, lastUpdated: timestamp };
  },
  ["leetcode-profile-cache-v1"],
  { revalidate: REVALIDATE }
);

export async function getLeetCodeProfile(): Promise<LeetCodeData> {
  try {
    return await fetchLeetCodeProfile();
  } catch (error) {
    console.error("LeetCode error:", error);
    return { ...FALLBACK_LEETCODE, lastUpdated: new Date().toISOString() };
  }
}

const fetchCodeChefProfile = unstable_cache(
  async (): Promise<CodeChefData> => {
    const timestamp = new Date().toISOString();
    const res = await fetch("https://www.codechef.com/users/gymgeek_coder", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });
    
    if (!res.ok) throw new Error("Failed to fetch CC");
    const html = await res.text();

    const ratingMatch = html.match(/<div class="rating-number">(\d+?)<\/div>/);
    const highestMatch = html.match(/Highest Rating (\d+)/);
    const starMatch = html.match(/<span class="rating">([^<]+)<\/span>/);
    const solvedMatch = html.match(/Total Problems Solved: (\d+)/);

    // If we fail to parse anything, treat it as an error to keep stale cache
    if (!ratingMatch && !solvedMatch) {
      throw new Error("CC parsing failed");
    }

    return {
      rating: ratingMatch ? ratingMatch[1] : FALLBACK_CODECHEF.rating,
      maxRating: highestMatch ? highestMatch[1] : FALLBACK_CODECHEF.maxRating,
      stars: starMatch ? starMatch[1] : FALLBACK_CODECHEF.stars,
      problemsSolved: solvedMatch ? solvedMatch[1] : FALLBACK_CODECHEF.problemsSolved,
      lastUpdated: timestamp,
    };
  },
  ["codechef-profile-cache-v1"],
  { revalidate: REVALIDATE }
);

export async function getCodeChefProfile(): Promise<CodeChefData> {
  try {
    return await fetchCodeChefProfile();
  } catch (error) {
    console.error("CodeChef error:", error);
    return { ...FALLBACK_CODECHEF, lastUpdated: new Date().toISOString() };
  }
}
