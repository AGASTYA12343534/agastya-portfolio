import { db } from "./client";
import {
  profile,
  projects,
  experiences,
  skills,
  services,
  socialLinks,
  fundingLinks,
  taglines,
  faqs,
  testimonials,
} from "./schema";
import { requireEnv } from "@/lib/env";

// ---------------------------------------------------------------------------
// Seed data — the initial content inserted only on a fresh (empty) database.
// Assembled into SEED_DATA and inserted once by seed(); later content changes
// are made in the admin panel or the DB, not by re-running the seed.
// ---------------------------------------------------------------------------

const taglineRows = [
  { text: "Rise above limits", active: true, order: 0 },
  { text: "Think, build, and ship", active: true, order: 1 },
];

// avatarUrl is validated as a full http(s) URL, so seed it as an absolute URL
// pointing at the bundled asset on whatever site this database serves.
// NEXT_PUBLIC_SITE_URL is always set (no fallback) — fail loudly if it isn't.
const SITE_ORIGIN = requireEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
const seededAvatarUrl = `${SITE_ORIGIN}/images/agastya.png`;

const profileRow = {
  name: "Agastya",
  bio: "I am an Information Technology undergraduate at IIIT Lucknow passionate about building production-grade AI-powered web applications, solving complex algorithmic problems, and creating modern full-stack software with exceptional user experiences.",
  stats: { years: 2, repos: 30, stars: 0, followers: 0 },
  roles: ["Full Stack Developer", "AI Engineer", "Competitive Programmer"],
  // Resume URL lives in the DB only — set it via the admin panel.
  resumeUrl: null,
  avatarUrl: seededAvatarUrl,
  heroTagline: "Building AI-powered products that solve real-world problems.",
  sectionVisibility: {},
};

const featuredSet = new Set([
  "Vibe-code-editor",
  "chatbot-restaurant",
]);
const projectRows: (typeof projects.$inferInsert)[] = [
  {
    repo: "Vibe-code-editor",
    title: "Vibecode Editor",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Prisma", "MongoDB", "WebContainers", "Monaco Editor", "Xterm.js", "Ollama"],
  },
  {
    repo: "chatbot-restaurant",
    title: "Restaurant Menu Gen-AI Chatbot",
    tags: ["Python", "Streamlit", "LangChain", "Pinecone", "MongoDB", "RAG", "Google Gemini API"],
  },
].map((p, i) => ({
  ...p,
  featured: featuredSet.has(p.repo),
  order: i,
  hidden: false,
}));

const experienceRows = [
  {
    role: "Member",
    org: "Entrepreneurship Cell, IIIT Lucknow",
    period: "2023 - Present",
    location: "Lucknow, India",
    isCurrent: true,
    description: [
      "Contributing to the entrepreneurial ecosystem at IIIT Lucknow.",
    ],
    order: 0,
  }
];

// Skills are authored grouped by category, then flattened to rows with a
// running order so the Skills section renders them grouped and in sequence.
const skillGroups: {
  category: string;
  items: { name: string; level: string; iconPath: string }[];
}[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "C++", level: "Expert", iconPath: "/skills/cpp.svg" },
      { name: "Python", level: "Expert", iconPath: "/skills/python.svg" },
      { name: "JavaScript", level: "Expert", iconPath: "/skills/javascript.svg" },
      { name: "TypeScript", level: "Expert", iconPath: "/skills/typescript.svg" },
      { name: "SQL", level: "Intermediate", iconPath: "/skills/sql.svg" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: "Expert", iconPath: "/skills/react.svg" },
      { name: "Next.js", level: "Expert", iconPath: "/skills/nextjs.png" },
      { name: "Tailwind CSS", level: "Expert", iconPath: "/skills/tailwindcss.svg" },
      { name: "HTML", level: "Expert", iconPath: "/skills/html.svg" },
      { name: "CSS", level: "Expert", iconPath: "/skills/css.svg" },
      { name: "shadcn/ui", level: "Expert", iconPath: "/skills/shadcn.png" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "Expert", iconPath: "/skills/nodejs.svg" },
      { name: "Express.js", level: "Expert", iconPath: "/skills/express.svg" },
      { name: "FastAPI", level: "Intermediate", iconPath: "/skills/fastapi.svg" },
      { name: "REST APIs", level: "Expert", iconPath: "/skills/api.png" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", level: "Expert", iconPath: "/skills/mongodb.svg" },
      { name: "PostgreSQL", level: "Expert", iconPath: "/skills/postgresql.svg" },
      { name: "Prisma", level: "Expert", iconPath: "/skills/prisma.svg" },
      { name: "Pinecone", level: "Expert", iconPath: "/skills/pinecone.png" },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "LangChain", level: "Expert", iconPath: "/skills/langchain.png" },
      { name: "RAG", level: "Expert", iconPath: "/skills/rag.png" },
      { name: "Ollama", level: "Expert", iconPath: "/skills/ollama.png" },
      { name: "Google Gemini API", level: "Expert", iconPath: "/skills/gemini.png" },
      { name: "Streamlit", level: "Expert", iconPath: "/skills/streamlit.png" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: "Expert", iconPath: "/skills/git.svg" },
      { name: "GitHub", level: "Expert", iconPath: "/skills/github.svg" },
      { name: "Docker", level: "Intermediate", iconPath: "/skills/docker.png" },
      { name: "Linux", level: "Expert", iconPath: "/skills/ubuntu.png" },
      { name: "Postman", level: "Expert", iconPath: "/skills/postman.png" },
    ],
  },
  {
    category: "Core CS",
    items: [
      { name: "DSA", level: "Expert", iconPath: "/skills/dsa.png" },
      { name: "Operating Systems", level: "Expert", iconPath: "/skills/os.png" },
      { name: "DBMS", level: "Expert", iconPath: "/skills/dbms.png" },
      { name: "Computer Networks", level: "Expert", iconPath: "/skills/network.png" },
      { name: "OOP", level: "Expert", iconPath: "/skills/oop.png" },
    ],
  }
];
const skillRows = skillGroups.flatMap((g, gi) =>
  g.items.map((it, ii) => ({
    name: it.name,
    iconPath: it.iconPath,
    category: g.category,
    level: it.level,
    // category index * 100 + item index keeps groups contiguous and ordered.
    order: gi * 100 + ii,
  })),
);

const serviceRows = [
  {
    title: "Mobile App Development",
    shortDescription: "I create engaging mobile applications for your audience.",
    description:
      "I create captivating mobile apps from concept to deployment for iOS and Android. Using cutting-edge technologies, I ensure seamless performance, intuitive interfaces, and robust functionality that align with your business goals. Enjoy a flawless user experience and outstanding results.",
    order: 0,
  },
  {
    title: "Web Development",
    shortDescription: "I build visually stunning and user-friendly websites.",
    description:
      "I deliver stunning, user-friendly websites to establish your online presence. From simple sites to complex e-commerce platforms, I provide tailored solutions using the latest frameworks and technologies for a seamless, responsive, and SEO-friendly browsing experience. Enhance your online identity with quality.",
    order: 1,
  },
  {
    title: "Backend Development",
    shortDescription: "I create robust and scalable backend infrastructures.",
    description:
      "I enhance digital applications with robust, scalable backend infrastructures. I develop efficient database structures, APIs, and configure servers for optimal performance, security, and scalability, ensuring your applications handle high traffic and complex data management seamlessly. Rely on strong backend solutions.",
    order: 2,
  },
  {
    title: "Product Strategy",
    shortDescription: "I define goals, target audiences, and roadmap for success.",
    description:
      "I collaborate to define clear goals, target audiences, and a success roadmap. My expertise in product ideation and market analysis ensures your product meets user needs and aligns with your business strategy for long-term growth and full potential realization. Drive your product's success with strategic planning.",
    order: 3,
  },
  {
    title: "DevOps",
    shortDescription: "I streamline development and operations processes.",
    description:
      "I streamline development and operations processes through effective DevOps practices. I implement continuous integration and deployment pipelines, manage cloud infrastructure, and use containerization to ensure efficient, reliable, and scalable software delivery. Improve your workflow with DevOps solutions.",
    order: 4,
  },
  {
    title: "Database Management",
    shortDescription: "I manage and optimize your database systems.",
    description:
      "I manage and optimize your database systems for performance, reliability, and scalability. With expertise in SQL and NoSQL databases, I design schemas, write complex queries, and implement best practices for data integrity and security. Ensure your data is managed effectively and efficiently.",
    order: 5,
  },
];

const socialLinkRows = [
  {
    platform: "GitHub",
    url: "https://github.com/AGASTYA12343534",
    username: "AGASTYA12343534",
    order: 0,
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/agastya-70929b2b3/",
    username: "agastya",
    order: 1,
  },
  {
    platform: "Codeforces",
    url: "https://codeforces.com/profile/GymForceNavi",
    username: "GymForceNavi",
    order: 2,
  },
  {
    platform: "LeetCode",
    url: "https://leetcode.com/u/Agastya_06/",
    username: "Agastya_06",
    order: 3,
  },
  {
    platform: "CodeChef",
    url: "https://www.codechef.com/users/gymgeek_coder",
    username: "gymgeek_coder",
    order: 4,
  },
  {
    platform: "Email",
    url: "mailto:agastya110805@gmail.com",
    username: "agastya110805@gmail.com",
    order: 5,
  }
];

const fundingLinkRows = [
  {
    label: "GitHub Sponsors",
    url: "https://github.com/sponsors/AGASTYA12343534",
    primary: true,
    order: 0,
  },
  {
    label: "Ko-fi",
    url: "https://ko-fi.com/AGASTYA12343534",
    primary: false,
    order: 1,
  },
  {
    label: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/AGASTYA12343534",
    primary: false,
    order: 2,
  },
];

const faqRows = [
  {
    question: "Who is Agastya?",
    answer: "I am an Information Technology undergraduate at IIIT Lucknow passionate about building production-grade AI-powered web applications and solving complex algorithmic problems.",
    order: 0,
  },
  {
    question: "What does Agastya build?",
    answer: "I build full-stack web applications, AI-powered products, and modern software with exceptional user experiences.",
    order: 1,
  },
  {
    question: "What is Agastya's tech stack?",
    answer: "Next.js, TypeScript, and React on the frontend. Python, Node.js on the backend. MongoDB, PostgreSQL, and Prisma for databases. LangChain, RAG, and Ollama for AI.",
    order: 2,
  },
  {
    question: "Is Agastya available for collaboration?",
    answer: "Yes, I am open to discussing interesting projects. Feel free to contact me.",
    order: 3,
  },
  {
    question: "How can I contact Agastya?",
    answer: "Email is the fastest way - agastya110805@gmail.com. You can also reach me on GitHub and LinkedIn.",
    order: 4,
  },
];

// Demo testimonials covering every case (pending/approved/rejected, featured,
// complete vs sparse details, a duplicate email). Seeded ONLY into an empty
// testimonials table so real user submissions are never wiped.
const testimonialRows: (typeof testimonials.$inferInsert)[] = [
  {
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    relationship: "College friend & hackathon teammate",
    content:
      "Agastya is the most driven person I studied with. We built our first hackathon project together and he carried the team - clean architecture, calm under pressure, and genuinely fun to work with.",
    status: "approved",
    featured: true,
    order: 0,
    linkedinUrl: "https://www.linkedin.com/in/aaravmehta",
    githubUrl: "https://github.com/aaravmehta",
    websiteUrl: "https://aarav.dev",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    relationship: "Engineering Manager at Merito",
    content:
      "I managed Agastya for over a year. He consistently shipped polished features ahead of schedule and raised the quality bar for the whole team. A rare mix of speed and craft.",
    status: "approved",
    featured: true,
    order: 1,
    linkedinUrl: "https://www.linkedin.com/in/priyasharma",
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    relationship: "Open-source collaborator",
    content:
      "We maintain a Flutter package together. Agastya's reviews are thorough and kind, and his docs are the reason new contributors actually stick around.",
    status: "approved",
    featured: false,
    order: 2,
    githubUrl: "https://github.com/rahulverma",
    xUrl: "https://x.com/rahulverma",
  },
  {
    name: "Dr. Anjali Rao",
    email: "anjali.rao@example.com",
    relationship: "Professor, Computer Science",
    content:
      "Agastya was among the most curious students I taught. He asked the questions the rest of the class was afraid to, and he always followed through with working code.",
    status: "approved",
    featured: false,
    order: 3,
  },
  {
    name: "Sofia Almeida",
    email: "sofia.almeida@example.com",
    relationship: "Product designer, freelance project",
    content:
      "Handing designs to Agastya felt effortless. He respected the details, asked the right questions, and the final build looked better than the mockups.",
    status: "pending",
    featured: false,
    order: 4,
    instagramUrl: "https://instagram.com/sofia.designs",
    websiteUrl: "https://sofiaalmeida.design",
  },
  {
    name: "Karan Singh",
    email: "karan.singh@example.com",
    relationship: "Former teammate",
    content: "Dependable, sharp, and a great teammate. Would work with him again in a heartbeat.",
    status: "pending",
    featured: false,
    order: 5,
  },
  {
    // Duplicate email of Aarav above — exercises the admin duplicate flag.
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    relationship: "College friend",
    content:
      "Adding a second note because I forgot to mention - he also mentored three juniors on our team and they all credit him for their growth.",
    status: "pending",
    featured: false,
    order: 6,
  },
  {
    name: "Spammy McSpamface",
    email: "spam@example.com",
    relationship: "n/a",
    content:
      "Check out my amazing crypto deals at this totally legit link, definitely not spam at all friend.",
    status: "rejected",
    featured: false,
    order: 7,
  },
];

// Everything the seed writes, inserted only on a fresh (empty) database.
const SEED_DATA = {
  taglines: taglineRows,
  profile: profileRow,
  projects: projectRows,
  experiences: experienceRows,
  skills: skillRows,
  services: serviceRows,
  socialLinks: socialLinkRows,
  fundingLinks: fundingLinkRows,
  faqs: faqRows,
};

/**
 * Seed-if-empty: insert the canonical content ONLY when the database has no
 * profile row (a fresh first deploy). It never wipes or overwrites, so any
 * later edits — in the admin panel or directly in the DB — are preserved.
 * Subsequent content changes are made manually, not by re-running the seed.
 */
async function seed() {
  const [existing] = await db.select({ id: profile.id }).from(profile).limit(1);
  if (existing) {
    console.log("Database already has content; skipping seed.");
    return;
  }

  console.log("Empty database; seeding content tables…");

  await db.transaction(async (tx) => {
    await tx.insert(taglines).values(SEED_DATA.taglines);
    await tx.insert(profile).values(SEED_DATA.profile);
    await tx.insert(projects).values(SEED_DATA.projects);
    await tx.insert(experiences).values(SEED_DATA.experiences);
    await tx.insert(skills).values(SEED_DATA.skills);
    await tx.insert(services).values(SEED_DATA.services);
    await tx.insert(socialLinks).values(SEED_DATA.socialLinks);
    await tx.insert(fundingLinks).values(SEED_DATA.fundingLinks);
    await tx.insert(faqs).values(SEED_DATA.faqs);
  });

  console.log("Seed complete.");
}

/**
 * Seed demo testimonials for LOCAL UI testing only. These are fabricated, so
 * they must never reach production — skipped when NODE_ENV is "production".
 * Seeds only when the table is empty so real submissions are never wiped.
 */
async function seedDemoTestimonials() {
  if (process.env.NODE_ENV === "production") {
    console.log("Production environment; skipping demo testimonials.");
    return;
  }
  const existing = await db.select({ id: testimonials.id }).from(testimonials).limit(1);
  if (existing.length > 0) {
    console.log("Testimonials already present; skipping demo seed.");
    return;
  }
  await db.insert(testimonials).values(testimonialRows);
  console.log(`Seeded ${testimonialRows.length} demo testimonials (local only).`);
}

seed()
  .then(() => seedDemoTestimonials())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
