"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * Signature visual: a glowing "AI core" — a distorted, semi-transparent
 * icosahedron with an inner wireframe skeleton — sitting inside a field of
 * points arranged like a vector-embedding space. A cluster of points near
 * the core lights up amber and draws connective lines to its neighbors: a
 * literal, restrained nod to nearest-neighbor retrieval, the actual subject
 * of the RAG work this site is about. Fully draggable (OrbitControls),
 * auto-rotates when idle.
 */

const COUNT = 1400;
const RADIUS = 8.4;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function useCloudPositions() {
  return useMemo(() => {
    const rand = seededRandom(42);
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const u = rand();
      const v = rand();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = RADIUS * Math.cbrt(rand()) * 0.95 + 1.6;
      const x = r * Math.sin(phi) * Math.cos(theta) * 1.55;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.9;
      const z = r * Math.cos(phi) * 0.95;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);
}

function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.12;
    if (wireRef.current) wireRef.current.rotation.y -= delta * 0.08;
    if (wireRef.current) wireRef.current.rotation.x += delta * 0.03;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <group>
        <Icosahedron ref={meshRef} args={[1.7, 4]}>
          <MeshDistortMaterial
            color="#0E4E48"
            emissive="#4FD9C7"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.3}
            distort={0.35}
            speed={1.6}
            transparent
            opacity={0.55}
          />
        </Icosahedron>
        <Icosahedron ref={wireRef} args={[2.05, 1]}>
          <meshBasicMaterial color="#4FD9C7" wireframe transparent opacity={0.28} />
        </Icosahedron>
        <pointLight color="#4FD9C7" intensity={12} distance={9} />
      </group>
    </Float>
  );
}

function Field() {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useCloudPositions();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const clusterIdx = useMemo(() => {
    const rand = seededRandom(7);
    const idx: number[] = [];
    for (let i = 0; i < 30; i++) idx.push(Math.floor(rand() * COUNT));
    return idx;
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts: number[] = [];
    for (let i = 0; i < clusterIdx.length; i++) {
      const a = clusterIdx[i];
      const ax = positions[a * 3],
        ay = positions[a * 3 + 1],
        az = positions[a * 3 + 2];
      const dists = clusterIdx
        .filter((b) => b !== a)
        .map((b) => {
          const bx = positions[b * 3],
            by = positions[b * 3 + 1],
            bz = positions[b * 3 + 2];
          const d = (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2;
          return { b, d };
        })
        .sort((p, q) => p.d - q.d)
        .slice(0, 2);
      dists.forEach(({ b }) => {
        verts.push(ax, ay, az, positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]);
      });
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, [positions, clusterIdx]);

  const clusterGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array(clusterIdx.length * 3);
    clusterIdx.forEach((idx, i) => {
      verts[i * 3] = positions[idx * 3];
      verts[i * 3 + 1] = positions[idx * 3 + 1];
      verts[i * 3 + 2] = positions[idx * 3 + 2];
    });
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return geo;
  }, [positions, clusterIdx]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial size={0.034} color="#4FD9C7" transparent opacity={0.5} sizeAttenuation />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#4FD9C7" transparent opacity={0.25} />
      </lineSegments>
      <points geometry={clusterGeometry}>
        <pointsMaterial size={0.09} color="#F0B429" transparent opacity={0.95} sizeAttenuation />
      </points>
      <AICore />
    </group>
  );
}

function RigCamera() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.3, 11.5);
  }, [camera]);
  return null;
}

export default function EmbeddingField() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0 !touch-none"
    >
      <ambientLight intensity={0.4} />
      <RigCamera />
      <Field />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        rotateSpeed={0.35}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
    </Canvas>
  );
}
