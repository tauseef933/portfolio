export type Project = {
  slug: string;
  name: string;
  /** Small label above the title, e.g. "Freelance · Client work" */
  label?: string;
  /** One line: the problem this project solves */
  problem: string;
  /** Short flow shown in mono, e.g. "Query → Agents → Answer" */
  pipeline: string;
  stack: string[];
  /** Shown under "How it works" on featured cards */
  highlights: string[];
  /** Screenshot in /public/projects. Leave out to show a neutral pattern. */
  image?: string;
  /** CSS object-position for the screenshot (default "top") */
  imagePosition?: string;
  github?: string;
  live?: string;
  /** Shown instead of links when there is no public repo or demo */
  note?: string;
  /** Featured projects get a large card; the rest are listed compactly. */
  featured: boolean;
};

// Order matters: featured projects render in this order, first one is the wide card.
export const projects: Project[] = [
  {
    slug: "lexmind-ai",
    name: "LexMind AI",
    problem: "Answers legal questions grounded in the source documents, not one model's guess.",
    pipeline: "Question → Specialist agents → Grounded answer",
    stack: ["LangGraph", "Groq (Llama 3.1 70B)", "ChromaDB", "FastAPI", "React"],
    highlights: [
      "LangGraph orchestrates specialist agents instead of one monolithic prompt — each agent owns one part of the legal reasoning.",
      "ChromaDB vector store for legal-document retrieval.",
      "FastAPI backend and React / TypeScript / shadcn frontend, deployed on Vercel + Railway.",
    ],
    image: "/projects/lexmind-ai.png",
    github: "https://github.com/tauseef933/LexMind-AI",
    featured: true,
  },
  {
    slug: "nexus",
    name: "NEXUS",
    problem: "A multi-agent voice assistant for English and Roman Urdu that runs on CPU-only laptops.",
    pipeline: "Speech → Router → Agent → Voice reply",
    stack: ["Python", "FastAPI", "WebSocket", "Groq Whisper", "Llama 3.3 / Ollama", "edge-tts"],
    highlights: [
      "A router hands each turn to a specialist agent — Atlas (chat), Scout (weather, search, sites), Archivist (memory) and Echo (YouTube).",
      "Bilingual voice and typed chat with neural TTS that mirrors the user's language each turn.",
      "Live pipeline view driven by WebSocket events, with latency meters for STT → Router → Agent → TTS.",
      "Falls back to local Ollama when Groq rate-limits.",
    ],
    image: "/projects/nexus.png",
    github: "https://github.com/tauseef933/NEXUS",
    featured: true,
  },
  {
    slug: "codesage",
    name: "CodeSage",
    problem: "Ask an unfamiliar codebase a plain-English question and get the exact file and line as evidence.",
    pipeline: "Question → Hybrid search → File:line citations",
    stack: ["Python", "LangChain", "Hybrid retrieval (RRF)", "HyDE", "React"],
    highlights: [
      "AST-aware chunking, tuned for how code (not prose) is structured.",
      "Dense + sparse search merged with Reciprocal Rank Fusion, plus HyDE for harder queries.",
      "Groq / Gemini router balances cost, latency and quality; deployed on Oracle Cloud Always Free.",
    ],
    image: "/projects/codesage.png",
    github: "https://github.com/tauseef933/codesage",
    featured: true,
  },
  {
    slug: "faceless-shorts",
    name: "Faceless Shorts Pipeline",
    problem: "Turns one form submission into a finished, voiced and captioned short video — no manual editing.",
    pipeline: "Form → Script → Images → FFmpeg → Email",
    stack: ["n8n", "Groq", "Pollinations.ai", "FFmpeg"],
    highlights: [
      "A 27-node self-hosted n8n workflow: script generation (Groq) → images (Pollinations.ai) → assembly (FFmpeg).",
      "Runs end to end on free and self-hosted tools — no paid APIs.",
      "Emails the finished video straight to the requester.",
    ],
    image: "/projects/faceless-video.png",
    imagePosition: "left center",
    github: "https://github.com/tauseef933/n8n-faceless-video",
    featured: true,
  },
  {
    slug: "softoras-erp-assistant",
    name: "Softoras ERP AI Assistant",
    label: "Freelance · Client work",
    // TODO: replace with the real one-line problem, stack and highlights.
    problem: "An AI assistant for an ERP platform, built as freelance client work.",
    pipeline: "ERP data → AI assistant → Answers and actions",
    stack: [],
    highlights: [],
    note: "Client project — details available on request.",
    featured: true,
  },
  {
    slug: "promotion-optimization-system",
    name: "Promotion Optimization System",
    problem: "LLM-powered retail promotion insights with uplift prediction and vector product matching.",
    pipeline: "Catalogue → Vector match → Uplift model → Insights",
    stack: ["LangChain", "ChromaDB", "Hugging Face", "Gradio", "Flutter"],
    highlights: [
      "Vector search for product matching across large promotion catalogues.",
      "Fine-tuned Hugging Face transformers for uplift prediction.",
      "Gradio + Flutter interface for non-technical business users.",
    ],
    image: "/projects/promotion-optimization.png",
    github: "https://github.com/tauseef933/promotion-optimization-system",
    featured: false,
  },
  {
    slug: "ai-property-assistant",
    name: "AI Property Assistant",
    problem: "Stateful real-estate chatbot with dynamic tool switching and live weather context.",
    pipeline: "Chat → Tool switch → Cached answer",
    stack: ["n8n", "Supabase", "OpenAI GPT", "OpenWeatherMap API"],
    highlights: [
      "Conversations persisted in Supabase.",
      "Dynamic tool switching for property, pricing and local-weather questions.",
      "City-based caching keeps repeat queries fast and cheap.",
    ],
    image: "/projects/ai-property-assistant.webp",
    github: "https://github.com/tauseef933/AI-Property-Assistant",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
