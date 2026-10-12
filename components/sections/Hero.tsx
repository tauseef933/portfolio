import { profile } from "@/lib/content";
import HeroVisual from "../three/HeroVisual";
import Button from "../ui/Button";
import { ArrowUpRight, Download, GitHub, LinkedIn } from "../ui/Icons";

const CORE_STACK = ["Python", "LangChain", "LangGraph", "n8n", "FastAPI", "ChromaDB"];

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      {/* 3D field: a faded band at the top on phones, the right side on larger screens */}
      <div className="absolute right-0 top-0 -z-10 h-72 w-full opacity-50 [mask-image:linear-gradient(to_bottom,black_30%,transparent)] md:bottom-0 md:h-auto md:w-[62%] md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent,black_35%)]">
        <HeroVisual />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-content flex-col justify-center px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {profile.availability}
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-2xl font-medium tracking-tight text-muted sm:text-3xl">{profile.role}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">{profile.valueStatement}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary">
              View projects
            </Button>
            <Button href={profile.cv} download>
              <Download /> Download CV
            </Button>
            <Button href="#contact" variant="ghost">
              Contact me <ArrowUpRight />
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
              <GitHub /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
              <LinkedIn /> LinkedIn
            </a>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
            <p className="font-mono text-xs">{CORE_STACK.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
