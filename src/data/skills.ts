export const skillGroups = [
  {
    category: "Programming Languages",
    items: [
      { name: "C++", level: "Expert" },
      { name: "Python", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "SQL", level: "Intermediate" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "HTML", level: "Expert" },
      { name: "CSS", level: "Expert" },
      { name: "shadcn/ui", level: "Expert" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "Expert" },
      { name: "Express.js", level: "Expert" },
      { name: "FastAPI", level: "Intermediate" },
      { name: "REST APIs", level: "Expert" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MongoDB", level: "Expert" },
      { name: "PostgreSQL", level: "Expert" },
      { name: "Prisma", level: "Expert" },
      { name: "Pinecone", level: "Expert" },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "LangChain", level: "Expert" },
      { name: "RAG", level: "Expert" },
      { name: "Ollama", level: "Expert" },
      { name: "Google Gemini API", level: "Expert" },
      { name: "Streamlit", level: "Expert" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: "Expert" },
      { name: "GitHub", level: "Expert" },
      { name: "Docker", level: "Intermediate" },
      { name: "Linux", level: "Expert" },
      { name: "Postman", level: "Expert" },
    ],
  },
  {
    category: "Core CS",
    items: [
      { name: "DSA", level: "Expert" },
      { name: "Operating Systems", level: "Expert" },
      { name: "DBMS", level: "Expert" },
      { name: "Computer Networks", level: "Expert" },
      { name: "OOP", level: "Expert" },
    ],
  }
];

export const skillsData = skillGroups.flatMap((g, gi) =>
  g.items.map((it, ii) => ({
    name: it.name,
    category: g.category,
    level: it.level,
    order: gi * 100 + ii,
  }))
);
