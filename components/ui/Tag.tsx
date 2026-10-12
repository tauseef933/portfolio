export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-md border border-line bg-surface2 px-2 py-1 font-mono text-xs text-muted">
      {children}
    </li>
  );
}
