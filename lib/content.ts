// All site text lives here (projects are in lib/projects.ts).
// Edit this file to update the site — no layout code needs to change.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const profile = {
  name: "Tauseef Iqbal",
  role: "ML & AI Automation Engineer",
  location: "Islamabad, Pakistan",
  availability: "Open to remote and on-site ML / AI automation roles",
  valueStatement:
    "I build RAG systems, multi-agent LLM apps and automation pipelines that hold up on real data, not just in a demo.",
  email: "tauseefiqbal933@gmail.com",
  phone: "+92 346 1985132",
  phoneHref: "tel:+923461985132",
  github: "https://github.com/tauseef933",
  linkedin: "https://linkedin.com/in/tauseef-iqbal933",
  cv: "/Tauseef_Iqbal_ML_Engineer_CV.pdf",
};

export const seo = {
  title: `${profile.name} — ML & AI Automation Engineer`,
  description:
    "ML and AI Automation Engineer in Islamabad building RAG systems, multi-agent LLM apps and n8n automation pipelines. Open to remote and on-site roles.",
};

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const about = {
  heading: "I work where a model's output has to become something a business can rely on.",
  paragraphs: [
    "I'm an ML and AI Automation Engineer based in Islamabad. I build RAG systems, multi-agent LLM applications and automation pipelines, and I care most about the part after the demo: making them work reliably on real, messy data.",
    "At DCUBE Technologies I raised product-mapping accuracy for a US e-commerce client from about 60% to over 80%, and shipped LLM tools and a WhatsApp support agent. I now work freelance, currently building an ERP AI assistant for Softoras.",
    "My day-to-day stack is Python, LangChain / LangGraph, Hugging Face and vector search (ChromaDB, hybrid retrieval, RRF, HyDE), with n8n for orchestration. I like systems that can explain themselves — CodeSage, for example, cites the exact file and line behind every answer.",
  ],
  stats: [
    { value: "60→80%", label: "Product-mapping accuracy for a live US client" },
    { value: "5+", label: "AI systems shipped, from RAG to automation" },
    { value: "16 mo", label: "Industry ML experience at DCUBE Technologies" },
  ],
};

export type Role = {
  title: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: Role[] = [
  {
    title: "Freelance AI Automation Engineer",
    org: "Independent · Client work",
    // TODO: add the start month, e.g. "Sep 2026 – Present"
    period: "Present",
    points: [
      "Building an AI assistant for Softoras's ERP platform.",
      // TODO: add 1–2 concrete bullets once you can share them.
    ],
  },
  {
    title: "Junior Machine Learning Engineer",
    org: "DCUBE Technologies · NUST Islamabad",
    period: "Aug 2025 – Aug 2026",
    points: [
      "Raised product-mapping accuracy from ~60% to over 80% for a US e-commerce client by re-analysing key columns against a reference taxonomy.",
      "Built an LLM-powered Promotion Optimization System (LangChain + ChromaDB) for retail insight generation.",
      "Shipped an automated WhatsApp AI agent for conversational customer support.",
      "Owned Akeneo product-data pipelines and image-processing workflows for catalogue operations.",
    ],
  },
  {
    title: "Machine Learning Engineer Intern",
    org: "DCUBE Technologies · NUST Islamabad",
    period: "Apr 2025 – Jul 2025",
    points: [
      "Engineered a retail promotion optimisation system with a Gradio + Flutter interface.",
      "Fine-tuned Hugging Face transformer models for recommendation and uplift prediction.",
    ],
  },
];

export const skillGroups = [
  {
    title: "LLM & RAG",
    skills: ["LangChain", "RAG", "Hybrid retrieval (RRF)", "HyDE", "OpenAI API", "Groq", "Hugging Face"],
  },
  {
    title: "Agents & Automation",
    skills: ["LangGraph", "Multi-agent systems", "n8n", "Tool calling", "WebSockets", "REST APIs"],
  },
  {
    title: "ML / Deep Learning",
    skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Transformer fine-tuning"],
  },
  {
    title: "Data & Vector Search",
    skills: ["ChromaDB", "Supabase", "Pandas", "NumPy", "SQL"],
  },
  {
    title: "Backend & Deployment",
    skills: ["FastAPI", "Docker", "Gradio", "Streamlit", "Vercel", "Railway", "Oracle Cloud"],
  },
  {
    title: "Languages",
    skills: ["Python", "SQL", "Dart", "TypeScript (React)"],
  },
];
