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

// Revalidate every 12 hours
const REVALIDATE = 43200;

export async function getCodeforcesProfile(): Promise<CodeforcesData> {
  const timestamp = new Date().toISOString();
  try {
    const [infoRes, statusRes] = await Promise.all([
      fetch("https://codeforces.com/api/user.info?handles=GymForceNavi", {
        next: { revalidate: REVALIDATE },
      }).catch(() => null),
      fetch("https://codeforces.com/api/user.status?handle=GymForceNavi", {
        next: { revalidate: REVALIDATE },
      }).catch(() => null),
    ]);

    let rating = FALLBACK_CODEFORCES.rating;
    let maxRating = FALLBACK_CODEFORCES.maxRating;
    let rank = FALLBACK_CODEFORCES.rank;
    let problemsSolved = FALLBACK_CODEFORCES.problemsSolved;

    if (infoRes && infoRes.ok) {
      const data = await infoRes.json();
      if (data.status === "OK" && data.result?.length > 0) {
        const user = data.result[0];
        rating = user.rating?.toString() || rating;
        maxRating = user.maxRating?.toString() || maxRating;
        rank = user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : rank;
      }
    }

    if (statusRes && statusRes.ok) {
      const data = await statusRes.json();
      if (data.status === "OK" && data.result) {
        const solved = new Set();
        data.result.forEach((sub: any) => {
          if (sub.verdict === "OK" && sub.problem?.contestId) {
            solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });
        problemsSolved = solved.size.toString();
      }
    }

    return { username: "GymForceNavi", rating, maxRating, rank, problemsSolved, lastUpdated: timestamp };
  } catch (error) {
    console.error("Codeforces error:", error);
    return { ...FALLBACK_CODEFORCES, lastUpdated: timestamp };
  }
}

export async function getLeetCodeProfile(): Promise<LeetCodeData> {
  const timestamp = new Date().toISOString();
  try {
    const [contestRes, solvedRes] = await Promise.all([
      fetch("https://alfa-leetcode-api.onrender.com/Agastya_06/contest", {
        next: { revalidate: REVALIDATE },
      }).catch(() => null),
      fetch("https://alfa-leetcode-api.onrender.com/Agastya_06/solved", {
        next: { revalidate: REVALIDATE },
      }).catch(() => null),
    ]);

    let contestRating = FALLBACK_LEETCODE.contestRating;
    let problemsSolved = FALLBACK_LEETCODE.problemsSolved;
    let easy = FALLBACK_LEETCODE.easy;
    let medium = FALLBACK_LEETCODE.medium;
    let hard = FALLBACK_LEETCODE.hard;

    if (contestRes && contestRes.ok) {
      const data = await contestRes.json();
      if (data.contestRating) {
        contestRating = Math.round(data.contestRating).toString();
      }
    }

    if (solvedRes && solvedRes.ok) {
      const data = await solvedRes.json();
      if (data.solvedProblem !== undefined) {
        problemsSolved = data.solvedProblem.toString();
        easy = data.easySolved?.toString() || easy;
        medium = data.mediumSolved?.toString() || medium;
        hard = data.hardSolved?.toString() || hard;
      }
    }

    return { problemsSolved, easy, medium, hard, contestRating, lastUpdated: timestamp };
  } catch (error) {
    console.error("LeetCode error:", error);
    return { ...FALLBACK_LEETCODE, lastUpdated: timestamp };
  }
}

export async function getCodeChefProfile(): Promise<CodeChefData> {
  const timestamp = new Date().toISOString();
  try {
    const res = await fetch("https://www.codechef.com/users/gymgeek_coder", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error("Failed to fetch CC");
    const html = await res.text();

    const ratingMatch = html.match(/<div class="rating-number">(\d+?)<\/div>/);
    const highestMatch = html.match(/Highest Rating (\d+)/);
    const starMatch = html.match(/<span class="rating">([^<]+)<\/span>/);
    const solvedMatch = html.match(/Total Problems Solved: (\d+)/);

    return {
      rating: ratingMatch ? ratingMatch[1] : FALLBACK_CODECHEF.rating,
      maxRating: highestMatch ? highestMatch[1] : FALLBACK_CODECHEF.maxRating,
      stars: starMatch ? starMatch[1] : FALLBACK_CODECHEF.stars,
      problemsSolved: solvedMatch ? solvedMatch[1] : FALLBACK_CODECHEF.problemsSolved,
      lastUpdated: timestamp,
    };
  } catch (error) {
    console.error("CodeChef error:", error);
    return { ...FALLBACK_CODECHEF, lastUpdated: timestamp };
  }
}
