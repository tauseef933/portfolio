/**
 * Lightweight SVG version of the retrieval field. Shown on phones, for
 * reduced-motion users, and while the 3D scene is loading.
 */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(11);
const DOTS = Array.from({ length: 140 }, () => ({
  x: Math.round(rand() * 600),
  y: Math.round(rand() * 480),
  r: rand() < 0.15 ? 2.2 : 1.4,
}));
const QUERY = { x: 360, y: 220 };
const NEIGHBOURS = [...DOTS]
  .sort((a, b) => (a.x - QUERY.x) ** 2 + (a.y - QUERY.y) ** 2 - ((b.x - QUERY.x) ** 2 + (b.y - QUERY.y) ** 2))
  .slice(0, 7);

export default function StaticField({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden className={className}>
      {DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} className="fill-muted" opacity={0.45} />
      ))}
      {NEIGHBOURS.map((n, i) => (
        <g key={i}>
          <line x1={QUERY.x} y1={QUERY.y} x2={n.x} y2={n.y} className="stroke-accent" strokeWidth={1} opacity={0.5} />
          <circle cx={n.x} cy={n.y} r={3} className="fill-accent" />
        </g>
      ))}
      <circle cx={QUERY.x} cy={QUERY.y} r={6} className="fill-accent" />
    </svg>
  );
}
