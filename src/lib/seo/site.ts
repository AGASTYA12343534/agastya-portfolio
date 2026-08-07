import { requirePublicEnv } from "@/lib/env";

export const SITE = {
  // Canonical production origin (https://AGASTYA12343534.com), env-driven with no
  // hardcoded fallback. Fails the build loudly on the server if missing; on the
  // client it never throws (would crash hydration) since Next inlines the value.
  url: requirePublicEnv("NEXT_PUBLIC_SITE_URL"),
  name: "Agastya",
  title: "Agastya - AI-first Software Engineer",
  description:
    "I am an Information Technology undergraduate at IIIT Lucknow, driven by a passion for competitive programming and architecting robust, production-grade systems. Over the last two years, my focus has spanned full-stack development and artificial intelligence, where I actively integrate modern AI tools to accelerate workflows and enhance code quality. Whether I'm designing scalable backends or evaluating frontier LLMs, I thrive on solving complex algorithmic challenges and continuously expanding my engineering expertise.",
  handle: "@agastya110805",
  sameAs: [
    "https://github.com/AGASTYA12343534",
    "https://www.linkedin.com/in/agastya-70929b2b3/",
  ],
} as const;
