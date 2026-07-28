export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  points: string[];
  image?: string; // drop a screenshot in /public/projects and set this
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "codesage",
    name: "CodeSage",
    tagline: "Natural-language search over any codebase",
    description:
      "A production-style RAG system that answers plain-English questions about a codebase — \"where is authentication handled?\" — and cites the exact file and line numbers as evidence.",
    stack: ["Python", "LangChain", "Hybrid Retrieval (RRF)", "HyDE", "React"],
    points: [
      "AST-aware code chunking, tuned for how code (not prose) is actually structured.",
      "Hybrid retrieval combining dense + sparse search via Reciprocal Rank Fusion, plus HyDE for harder queries.",
      "Groq / Gemini LLM router to balance cost, latency, and quality across free-tier providers.",
      "React frontend with a dark, editor-style UI; deployed on Oracle Cloud Always Free.",
    ],
    image: "/projects/codesage.png",
    github: "https://github.com/tauseef933/codesage",
    featured: true,
  },
  {
    slug: "lexmind-ai",
    name: "LexMind AI",
    tagline: "Multi-agent legal intelligence platform",
    description:
      "A multi-agent RAG platform that orchestrates specialized agents over a legal document corpus for retrieval, analysis, and Q&A.",
    stack: ["LangGraph", "Groq (Llama 3.1 70B)", "ChromaDB", "FastAPI", "React"],
    points: [
      "LangGraph orchestrates specialized agents instead of one monolithic prompt — each agent owns one part of legal reasoning.",
      "ChromaDB vector store for legal-document retrieval.",
      "FastAPI backend, React/TypeScript/shadcn frontend — deployed on Vercel + Railway.",
    ],
    image: "/projects/lexmind-ai.png",
    github: "https://github.com/tauseef933/LexMind-AI",
    featured: true,
  },
  {
    slug: "faceless-video-automation",
    name: "Faceless Video Automation",
    tagline: "Form submission → finished short video, fully automated",
    description:
      "A 27-node, self-hosted n8n workflow that turns a form submission into a voiced, captioned, faceless short video and emails it back — built entirely on free and self-hosted tools.",
    stack: ["n8n", "Groq", "Pollinations.ai", "FFmpeg"],
    points: [
      "Script generation (Groq) → image generation (Pollinations.ai) → assembly (FFmpeg), chained into one pipeline.",
      "Fully self-hosted — no paid APIs required to run end to end.",
      "Delivers the finished video straight to the requester's inbox with zero manual steps.",
    ],
    image: "/projects/faceless-video.png",
    github: "https://github.com/tauseef933/n8n-faceless-video",
    featured: true,
  },
  {
    slug: "promotion-optimization-system",
    name: "Promotion Optimization System",
    tagline: "LLM-powered retail promotion insights",
    description:
      "An intelligent retail promotion platform combining LLM-powered insights, uplift prediction, and vector search for product matching.",
    stack: ["LangChain", "ChromaDB", "Hugging Face", "Gradio", "Flutter"],
    points: [
      "Vector search for product matching across large promotion catalogs.",
      "Fine-tuned Hugging Face transformer models for uplift prediction.",
      "Gradio + Flutter interface for non-technical business users.",
    ],
    image: "/projects/promotion-optimization.png",
    github: "https://github.com/tauseef933/promotion-optimization-system",
    featured: true,
  },
  {
    slug: "ai-property-assistant",
    name: "AI Property Assistant",
    tagline: "Stateful real-estate chatbot with live context",
    description:
      "A real estate chatbot with dynamic tool switching, city-based response caching, and live weather context, orchestrated entirely as an n8n workflow.",
    stack: ["n8n", "Supabase", "OpenAI GPT", "OpenWeatherMap API"],
    points: [
      "Stateful conversations persisted in Supabase.",
      "Dynamic tool switching lets the same agent answer property, pricing, and local-weather questions.",
      "City-based caching keeps repeat queries fast and cheap.",
    ],
    image: "/projects/ai-property-assistant.png",
    github: "https://github.com/tauseef933/AI-Property-Assistant",
    featured: true,
  },
];
