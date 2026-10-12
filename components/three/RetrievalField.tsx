"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "Retrieval field": a cloud of embedding-like points grouped in soft clusters.
 * Every few seconds a query point lights up and links to its nearest neighbours —
 * a small visual nod to vector retrieval in RAG. Purely decorative.
 */

const COUNT = 2400;
const CLUSTERS = 9;
const K = 8; // neighbours per query
const QUERY_CANDIDATES = 32;
const QUERY_INTERVAL = 3; // seconds

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Box–Muller transform for normally distributed offsets.
function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

function buildField() {
  const rand = seeded(7);
  const centers = Array.from({ length: CLUSTERS }, () => [
    (rand() - 0.5) * 9,
    (rand() - 0.5) * 5.5,
    (rand() - 0.5) * 5,
  ]);
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    // ~80% of points sit in clusters, the rest drift as background noise.
    if (rand() < 0.8) {
      const c = centers[i % CLUSTERS];
      positions[i * 3] = c[0] + gaussian(rand) * 0.75;
      positions[i * 3 + 1] = c[1] + gaussian(rand) * 0.55;
      positions[i * 3 + 2] = c[2] + gaussian(rand) * 0.6;
    } else {
      positions[i * 3] = (rand() - 0.5) * 13;
      positions[i * 3 + 1] = (rand() - 0.5) * 8;
      positions[i * 3 + 2] = (rand() - 0.5) * 7;
    }
  }

  // Precompute k-nearest neighbours for a handful of query points.
  const queries = Array.from({ length: QUERY_CANDIDATES }, () => {
    const q = Math.floor(rand() * COUNT);
    const qx = positions[q * 3];
    const qy = positions[q * 3 + 1];
    const qz = positions[q * 3 + 2];
    const best: { i: number; d: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      if (i === q) continue;
      const d = (positions[i * 3] - qx) ** 2 + (positions[i * 3 + 1] - qy) ** 2 + (positions[i * 3 + 2] - qz) ** 2;
      if (best.length < K || d < best[best.length - 1].d) {
        best.push({ i, d });
        best.sort((a, b) => a.d - b.d);
        if (best.length > K) best.pop();
      }
    }
    return { q, neighbours: best.map((b) => b.i) };
  });

  return { positions, queries };
}

function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  // No mipmaps: they fade tiny points below the alpha cutoff.
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

function readColor(name: string) {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255);
}

function Field({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { positions, queries } = useMemo(buildField, []);
  const dot = useMemo(makeDotTexture, []);
  const group = useRef<THREE.Group>(null);

  const baseMat = useRef<THREE.PointsMaterial>(null);
  const hitMat = useRef<THREE.PointsMaterial>(null);
  const queryMat = useRef<THREE.PointsMaterial>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);

  const baseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  const hitGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(K * 3), 3));
    return g;
  }, []);
  const queryGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3), 3));
    return g;
  }, []);
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(K * 6), 3));
    return g;
  }, []);

  // Follow the site theme: colours come from the CSS variables.
  useEffect(() => {
    const apply = () => {
      const ink = readColor("--muted");
      const accent = readColor("--accent");
      baseMat.current?.color.copy(ink);
      hitMat.current?.color.copy(accent);
      queryMat.current?.color.copy(accent);
      lineMat.current?.color.copy(accent);
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const state = useRef({ index: -1, startedAt: -QUERY_INTERVAL });

  const showQuery = (index: number) => {
    const { q, neighbours } = queries[index];
    const qp = queryGeo.attributes.position as THREE.BufferAttribute;
    const hp = hitGeo.attributes.position as THREE.BufferAttribute;
    const lp = lineGeo.attributes.position as THREE.BufferAttribute;
    qp.setXYZ(0, positions[q * 3], positions[q * 3 + 1], positions[q * 3 + 2]);
    neighbours.forEach((n, i) => {
      const x = positions[n * 3];
      const y = positions[n * 3 + 1];
      const z = positions[n * 3 + 2];
      hp.setXYZ(i, x, y, z);
      lp.setXYZ(i * 2, positions[q * 3], positions[q * 3 + 1], positions[q * 3 + 2]);
      lp.setXYZ(i * 2 + 1, x, y, z);
    });
    qp.needsUpdate = hp.needsUpdate = lp.needsUpdate = true;
  };

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const s = state.current;
    if (t - s.startedAt >= QUERY_INTERVAL) {
      s.index = (s.index + 1) % queries.length;
      s.startedAt = t;
      showQuery(s.index);
    }
    // Fade the highlight in, hold, then fade out before the next query.
    const p = (t - s.startedAt) / QUERY_INTERVAL;
    const alpha = p < 0.2 ? p / 0.2 : p > 0.8 ? (1 - p) / 0.2 : 1;
    if (lineMat.current) lineMat.current.opacity = alpha * 0.8;
    if (hitMat.current) hitMat.current.opacity = alpha;
    if (queryMat.current) queryMat.current.opacity = alpha;

    // Slow drift plus a gentle tilt toward the pointer.
    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.03;
      g.rotation.x += (pointer.current.y * 0.15 - g.rotation.x) * 0.04;
      g.position.x += (pointer.current.x * 0.4 - g.position.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <points geometry={baseGeo}>
        <pointsMaterial
          ref={baseMat}
          size={0.075}
          map={dot}
          alphaTest={0.2}
          transparent
          opacity={0.7}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial ref={lineMat} transparent opacity={0} depthWrite={false} />
      </lineSegments>
      <points geometry={hitGeo}>
        <pointsMaterial ref={hitMat} size={0.16} map={dot} alphaTest={0.2} transparent opacity={0} sizeAttenuation />
      </points>
      <points geometry={queryGeo}>
        <pointsMaterial ref={queryMat} size={0.3} map={dot} alphaTest={0.2} transparent opacity={0} sizeAttenuation />
      </points>
    </group>
  );
}

export default function RetrievalField({ active, onReady }: { active: boolean; onReady?: () => void }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={() => onReady?.()}
    >
      <Field pointer={pointer} />
    </Canvas>
  );
}
