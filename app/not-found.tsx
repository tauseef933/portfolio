import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-content flex-col items-start justify-center px-4 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-muted">The link may be old or mistyped.</p>
      <Button href="/" variant="primary" className="mt-8">
        Back to home
      </Button>
    </main>
  );
}
