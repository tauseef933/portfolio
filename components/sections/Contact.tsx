import { profile } from "@/lib/content";
import Button from "../ui/Button";
import CopyEmail from "../ui/CopyEmail";
import { Download, GitHub, LinkedIn } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Have a role where retrieval, reasoning or automation matters? Let's talk."
      intro={`Open to remote and on-site roles · ${profile.location} (PKT, UTC+5)`}
    >
      <Reveal>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-sm text-muted">Email is the fastest way to reach me</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="break-all text-xl font-semibold tracking-tight hover:text-accent sm:text-2xl">
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`} variant="primary">
              Send an email
            </Button>
            <Button href={profile.linkedin}>
              <LinkedIn /> LinkedIn
            </Button>
            <Button href={profile.github}>
              <GitHub /> GitHub
            </Button>
            <Button href={profile.cv} download>
              <Download /> Download CV
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted">
            Phone:{" "}
            <a href={profile.phoneHref} className="text-ink hover:text-accent">
              {profile.phone}
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
