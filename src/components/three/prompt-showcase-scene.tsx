"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import type {
  PromptShowcaseEntry,
  PromptShowcasePalette
} from "@/components/three/prompt-showcase-presets";

function SceneRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.45;
    const targetY = 0.28 + state.pointer.y * 0.24;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0.08, 0);
  });

  return null;
}

function StageBackdrop({ palette }: { palette: PromptShowcasePalette }) {
  const scaffold = [
    { position: [-2.45, 0.94, -2.36], rotation: [0.18, 0.42, 0.05], scale: [0.08, 2.9, 0.08] },
    { position: [2.58, 0.74, -2.2], rotation: [0.12, -0.4, -0.06], scale: [0.08, 2.6, 0.08] },
    { position: [-1.86, -0.42, -2.04], rotation: [-0.08, 0.34, 0.03], scale: [1.18, 1.52, 0.06] },
    { position: [1.92, -0.54, -1.94], rotation: [-0.04, -0.36, -0.02], scale: [1.24, 1.68, 0.06] }
  ] as const;

  return (
    <>
      <mesh position={[0, 0.2, -3.5]} scale={[9.2, 6.8, 0.12]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={palette.mist} transparent opacity={0.16} />
      </mesh>
      <mesh position={[-1.9, 1.5, -2.8]} scale={[1.5, 1.5, 0.08]}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.12} />
      </mesh>
      <mesh position={[2.05, -0.2, -2.7]} scale={[1.9, 1.9, 0.08]}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.08} />
      </mesh>
      {scaffold.map((frame, index) => (
        <mesh
          key={`stage-frame-${index}`}
          position={frame.position}
          rotation={frame.rotation}
          scale={frame.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={index < 2 ? palette.line : palette.accentSoft}
            metalness={0.18}
            opacity={0.18}
            roughness={0.82}
            transparent
          />
        </mesh>
      ))}
    </>
  );
}

function ReflectiveFloor({ palette }: { palette: PromptShowcasePalette }) {
  return (
    <group position={[0, -1.52, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.6, 72]} />
        <meshStandardMaterial color={palette.floor} metalness={0.58} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.72, 2.84, 72]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.34} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.08, 3.42, 72]} />
        <meshBasicMaterial color={palette.line} transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function ParticleField({ palette }: { palette: PromptShowcasePalette }) {
  const positions = useMemo(() => {
    const values = new Float32Array(220 * 3);

    for (let index = 0; index < values.length; index += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 2.8;
      const y = -1.1 + Math.random() * 3.3;

      values[index] = Math.cos(angle) * radius;
      values[index + 1] = y;
      values[index + 2] = -2.4 + Math.random() * 4.1;
    }

    return values;
  }, []);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={palette.accentSoft}
        opacity={0.76}
        size={0.035}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function Monolith({
  palette,
  position,
  rotation,
  scale
}: {
  palette: PromptShowcasePalette;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) {
  const bars = [
    { position: [-0.12, 0.26, 0.56], scale: [0.56, 0.05, 0.02], color: palette.accent },
    { position: [-0.08, 0.08, 0.56], scale: [0.68, 0.04, 0.02], color: palette.line },
    { position: [0.05, -0.1, 0.56], scale: [0.52, 0.04, 0.02], color: palette.line },
    { position: [0.06, -0.3, 0.56], scale: [0.2, 0.16, 0.02], color: palette.accentSoft }
  ] satisfies ReadonlyArray<{
    color: string;
    position: [number, number, number];
    scale: [number, number, number];
  }>;
  const trims = [
    { position: [-0.47, 0, 0.52], scale: [0.028, 0.96, 0.05] },
    { position: [0.47, 0, 0.52], scale: [0.028, 0.96, 0.05] },
    { position: [0, 0.47, 0.52], scale: [0.96, 0.028, 0.05] },
    { position: [0, -0.47, 0.52], scale: [0.96, 0.028, 0.05] }
  ] satisfies ReadonlyArray<{
    position: [number, number, number];
    scale: [number, number, number];
  }>;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#11151e" metalness={0.32} roughness={0.3} />
      </mesh>
      {trims.map((trim, index) => (
        <mesh key={`trim-${index}`} position={trim.position} scale={trim.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0.08}
            color={palette.accentSoft}
            emissive={palette.accent}
            emissiveIntensity={0.04}
            metalness={0.92}
            reflectivity={0.96}
            roughness={0.18}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.53]} scale={[0.92, 0.92, 0.06]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.08}
          color="#1b2230"
          emissive="#0d1018"
          emissiveIntensity={0.14}
          ior={1.42}
          metalness={0.16}
          reflectivity={0.92}
          roughness={0.12}
        />
      </mesh>
      <mesh position={[0, 0, 0.58]} scale={[0.98, 0.98, 0.02]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.04}
          color="#120d0d"
          emissive={palette.accent}
          emissiveIntensity={0.03}
          metalness={0.28}
          opacity={0.26}
          roughness={0.06}
          transparent
        />
      </mesh>
      {bars.map((bar, index) => (
        <mesh key={`monolith-bar-${index}`} position={bar.position} scale={bar.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={index === 0 ? 1.1 : 0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

function MonolithDrift({ palette }: { palette: PromptShowcasePalette }) {
  const groupRef = useRef<THREE.Group>(null);
  const shardRefs = useRef<Array<THREE.Mesh | null>>([]);
  const shards = [
    { position: [-2.4, 1.1, 0.7], scale: [0.14, 0.42, 0.12], speed: 0.56 },
    { position: [2.18, 0.82, 1.2], scale: [0.12, 0.26, 0.1], speed: 0.72 },
    { position: [-2.1, -0.7, 0.96], scale: [0.16, 0.12, 0.36], speed: 0.65 },
    { position: [1.94, -0.92, 0.34], scale: [0.12, 0.18, 0.24], speed: 0.51 }
  ] as const;
  const plinths = [
    { position: [0, -1.08, 0.18], scale: [2.42, 0.12, 1.32] },
    { position: [-1.64, -1.02, 0.92], scale: [1.1, 0.1, 0.82] },
    { position: [1.78, -1.04, 1.02], scale: [1.18, 0.1, 0.9] }
  ] satisfies ReadonlyArray<{
    position: [number, number, number];
    scale: [number, number, number];
  }>;
  const lightBlades = [
    { position: [-2.64, 0.1, 0.08], rotation: [0, 0.56, 0.22], scale: [0.18, 2.2, 0.04] },
    { position: [2.76, -0.16, -0.08], rotation: [0, -0.62, -0.18], scale: [0.16, 2.46, 0.04] }
  ] satisfies ReadonlyArray<{
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }>;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.24) * 0.16;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    shardRefs.current.forEach((mesh, index) => {
      const shard = shards[index];

      if (!mesh || !shard) {
        return;
      }

      mesh.position.y = shard.position[1] + Math.sin(state.clock.elapsedTime * shard.speed + index) * 0.16;
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.004;
      mesh.rotation.z += 0.003;
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <Monolith
        palette={palette}
        position={[0, 0.2, 0.1]}
        rotation={[0.02, 0, 0]}
        scale={[1.74, 2.46, 0.24]}
      />
      <Monolith
        palette={palette}
        position={[-1.6, 0.12, 0.92]}
        rotation={[0.08, 0.54, 0.02]}
        scale={[0.88, 2.06, 0.18]}
      />
      <Monolith
        palette={palette}
        position={[1.72, 0.04, 1.02]}
        rotation={[-0.04, -0.62, -0.03]}
        scale={[0.94, 2.22, 0.18]}
      />
      {plinths.map((base, index) => (
        <mesh key={`plinth-${index}`} position={base.position} scale={base.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0.12}
            color="#120f16"
            emissive={palette.accent}
            emissiveIntensity={index === 0 ? 0.03 : 0.02}
            metalness={0.42}
            reflectivity={0.94}
            roughness={0.16}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.4, -0.92]} rotation={[0, 0.44, 0]} scale={[2.18, 0.12, 0.12]}>
        <torusGeometry args={[1, 0.08, 12, 90, Math.PI * 1.28]} />
        <meshStandardMaterial color={palette.accentSoft} emissive={palette.accent} emissiveIntensity={0.32} />
      </mesh>
      {lightBlades.map((blade, index) => (
        <mesh key={`light-blade-${index}`} position={blade.position} rotation={blade.rotation} scale={blade.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={palette.accent} opacity={0.5} transparent />
        </mesh>
      ))}
      {shards.map((shard, index) => (
        <mesh
          castShadow
          key={`shard-${index}`}
          position={shard.position}
          ref={(element) => {
            shardRefs.current[index] = element;
          }}
          scale={shard.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={index % 2 === 0 ? palette.accent : palette.line} metalness={0.62} roughness={0.18} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitForge({ palette }: { palette: PromptShowcasePalette }) {
  const worldRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<Array<THREE.Mesh | null>>([]);
  const orbitRings = [
    { rotation: [0.4, 0.2, 0.2], scale: 1.2 },
    { rotation: [1.1, 0.3, 0.1], scale: 1.62 },
    { rotation: [0.2, 0.9, 0.7], scale: 2.06 }
  ] satisfies ReadonlyArray<{
    rotation: [number, number, number];
    scale: number;
  }>;
  const orbitPanels = [
    { position: [-1.72, 0.38, 0.84], rotation: [0.1, 0.52, 0.12] },
    { position: [1.86, -0.16, 0.74], rotation: [-0.12, -0.48, -0.08] },
    { position: [0.08, -1.02, 0.24], rotation: [-0.48, 0.08, 0.42] }
  ] satisfies ReadonlyArray<{
    position: [number, number, number];
    rotation: [number, number, number];
  }>;

  useFrame((state) => {
    if (worldRef.current) {
      worldRef.current.rotation.y += 0.003;
      worldRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.44) * 0.08;
    }

    ringRefs.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      ring.rotation.x += 0.0024 + index * 0.0008;
      ring.rotation.y -= 0.003 + index * 0.0007;
    });
  });

  return (
    <group ref={worldRef} position={[0, -0.05, 0]}>
      <mesh castShadow position={[0, 0.18, 0]} scale={[1.18, 1.18, 1.18]}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.04}
          color={palette.accentSoft}
          emissive={palette.accent}
          emissiveIntensity={0.18}
          ior={1.48}
          reflectivity={0.96}
          metalness={0.12}
          roughness={0.04}
          sheen={1}
          sheenColor={palette.line}
          sheenRoughness={0.16}
          transmission={0.18}
        />
      </mesh>
      {orbitRings.map((ring, index) => (
        <mesh
          key={`orbit-ring-${index}`}
          ref={(element) => {
            ringRefs.current[index] = element;
          }}
          rotation={ring.rotation}
          scale={[ring.scale, ring.scale, ring.scale]}
        >
          <torusGeometry args={[1, 0.052, 12, 120]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0.08}
            color={index === 1 ? palette.line : palette.accent}
            emissive={index === 1 ? palette.line : palette.accent}
            emissiveIntensity={0.06}
            metalness={0.92}
            reflectivity={0.96}
            roughness={0.16}
          />
        </mesh>
      ))}
      {new Array(8).fill(null).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 8;

        return (
          <mesh
            key={`orbit-node-${index}`}
            position={[Math.cos(angle) * 2.16, Math.sin(angle * 1.3) * 0.52, Math.sin(angle) * 1.18]}
            scale={[0.18, 0.18, 0.18]}
          >
            <sphereGeometry args={[1, 20, 20]} />
            <meshStandardMaterial color={index % 2 === 0 ? palette.accentSoft : palette.line} emissive={palette.glow} emissiveIntensity={0.18} />
          </mesh>
        );
      })}
      {orbitPanels.map((panel, index) => (
        <mesh key={`orbit-panel-${index}`} position={panel.position} rotation={panel.rotation} scale={[0.9, 1.26, 0.06]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0.16}
            color="#10243a"
            metalness={0.18}
            opacity={0.78}
            roughness={0.12}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function PetalSignal({ palette }: { palette: PromptShowcasePalette }) {
  const towerRef = useRef<THREE.Group>(null);
  const petalsRef = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state) => {
    if (towerRef.current) {
      towerRef.current.rotation.y += 0.0024;
      towerRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }

    petalsRef.current.forEach((petal, index) => {
      if (!petal) {
        return;
      }

      petal.rotation.z = Math.sin(state.clock.elapsedTime * 1.1 + index) * 0.18;
      petal.position.y = Math.sin(state.clock.elapsedTime * 0.8 + index * 0.3) * 0.08;
    });
  });

  return (
    <group ref={towerRef} position={[0, -0.04, 0]}>
      <mesh castShadow position={[0, 0.08, 0]} scale={[0.26, 2.48, 0.26]}>
        <cylinderGeometry args={[1, 0.76, 1, 24, 1]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.06}
          color={palette.accentSoft}
          emissive={palette.accent}
          emissiveIntensity={0.08}
          ior={1.46}
          metalness={0.1}
          reflectivity={0.94}
          roughness={0.06}
        />
      </mesh>
      <mesh position={[0, 1.26, -0.42]} scale={[1.6, 1.6, 0.08]}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color={palette.glow} opacity={0.18} transparent />
      </mesh>
      <mesh position={[0, 0.62, 0]} scale={[1.74, 1.74, 1]}>
        <torusGeometry args={[1, 0.05, 10, 80]} />
        <meshStandardMaterial color={palette.line} emissive={palette.accentSoft} emissiveIntensity={0.18} />
      </mesh>
      {new Array(12).fill(null).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 12;
        const radius = index % 2 === 0 ? 1.1 : 1.34;
        const y = index % 2 === 0 ? 0.08 : -0.16;

        return (
          <mesh
            castShadow
            key={`petal-${index}`}
            position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}
            ref={(element) => {
              petalsRef.current[index] = element;
            }}
            rotation={[0, -angle + Math.PI / 2, 0.24]}
            scale={[0.3, 1.28, 0.08]}
          >
            <capsuleGeometry args={[0.34, 0.76, 4, 8]} />
            <meshPhysicalMaterial
              clearcoat={1}
              clearcoatRoughness={0.1}
              color={index % 3 === 0 ? palette.accent : palette.accentSoft}
              iridescence={0.18}
              iridescenceIOR={1.3}
              reflectivity={0.9}
              opacity={0.88}
              roughness={0.08}
              side={THREE.DoubleSide}
              transmission={0.14}
              transparent
            />
          </mesh>
        );
      })}
      {new Array(8).fill(null).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 8;

        return (
          <mesh
            key={`leaf-${index}`}
            position={[Math.cos(angle) * 2.04, 0.52 + Math.sin(angle * 2.2) * 0.5, Math.sin(angle) * 1.4]}
            rotation={[0.32, angle, 0.56]}
            scale={[0.18, 0.52, 0.04]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial color={palette.line} opacity={0.58} roughness={0.08} transparent />
          </mesh>
        );
      })}
    </group>
  );
}

function TidalBeacon({ palette }: { palette: PromptShowcasePalette }) {
  const worldRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<Array<THREE.Mesh | null>>([]);
  const tidalRings = [
    { radius: 1.24, y: -0.18, arc: Math.PI * 1.54, rotation: 0.1 },
    { radius: 1.82, y: -0.34, arc: Math.PI * 1.26, rotation: 0.7 },
    { radius: 2.38, y: -0.54, arc: Math.PI * 1.18, rotation: 1.22 }
  ] as const;

  useFrame((state) => {
    if (worldRef.current) {
      worldRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.14;
      worldRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.42) * 0.05;
    }

    ringRefs.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      ring.rotation.z += 0.0032 + index * 0.0008;
    });
  });

  return (
    <group ref={worldRef} position={[0, -0.08, 0]}>
      <mesh castShadow position={[0, 0.18, 0]} scale={[0.42, 2.68, 0.42]}>
        <cylinderGeometry args={[1, 0.82, 1, 28, 1]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.08}
          color={palette.line}
          metalness={0.38}
          reflectivity={0.94}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 1.42, 0]} scale={[0.72, 0.72, 0.72]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.04}
          color={palette.accentSoft}
          emissive={palette.glow}
          emissiveIntensity={0.16}
          ior={1.4}
          reflectivity={0.98}
          roughness={0.04}
          transmission={0.24}
        />
      </mesh>
      <mesh position={[0.66, 1.34, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1.24, 1.24, 2.2]}>
        <coneGeometry args={[0.46, 1.8, 24, 1, true]} />
        <meshBasicMaterial color={palette.glow} opacity={0.16} transparent />
      </mesh>
      {tidalRings.map((ring, index) => (
        <mesh
          key={`tidal-ring-${index}`}
          position={[0, ring.y, 0]}
          ref={(element) => {
            ringRefs.current[index] = element;
          }}
          rotation={[Math.PI / 2, 0, ring.rotation]}
        >
          <torusGeometry args={[ring.radius, 0.06, 12, 96, ring.arc]} />
          <meshStandardMaterial color={index === 1 ? palette.line : palette.accent} emissive={palette.glow} emissiveIntensity={0.24} />
        </mesh>
      ))}
      {new Array(12).fill(null).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 12;

        return (
          <mesh
            key={`spray-${index}`}
            position={[Math.cos(angle) * 2.34, -0.18 + Math.sin(angle * 1.8) * 0.26, Math.sin(angle) * 1.42]}
            scale={[0.12, 0.12, 0.12]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color={index % 2 === 0 ? palette.accentSoft : palette.line} emissive={palette.glow} emissiveIntensity={0.12} />
          </mesh>
        );
      })}
    </group>
  );
}

function SceneContent({ entry }: { entry: PromptShowcaseEntry }) {
  switch (entry.id) {
    case "orbit-forge":
      return <OrbitForge palette={entry.palette} />;
    case "petal-signal":
      return <PetalSignal palette={entry.palette} />;
    case "tidal-beacon":
      return <TidalBeacon palette={entry.palette} />;
    case "monolith-drift":
    default:
      return <MonolithDrift palette={entry.palette} />;
  }
}

export function PromptShowcaseScene({ entry }: { entry: PromptShowcaseEntry }) {
  const { palette } = entry;

  return (
    <>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.fog, 5.2, 14]} />
      <SceneRig />
      <ambientLight intensity={0.72} />
      <hemisphereLight color="#f6fbff" groundColor={palette.floor} intensity={0.84} />
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={1.48}
        position={[3.2, 4.8, 3.2]}
        shadow-bias={-0.0004}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight color={palette.glow} distance={10} intensity={12} position={[0, 2.1, 2.2]} />
      <pointLight color={palette.accent} distance={8} intensity={9} position={[-2, 0.4, 1.4]} />
      <StageBackdrop palette={palette} />
      <ReflectiveFloor palette={palette} />
      <ParticleField palette={palette} />
      <SceneContent entry={entry} />
    </>
  );
}
