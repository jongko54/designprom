"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function CameraRig() {
  const camera = useThree((state) => state.camera);

  useFrame(({ clock, pointer }) => {
    const driftY = Math.sin(clock.elapsedTime * 0.4) * 0.14;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.55, 0.04);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.35 + pointer.y * 0.32 + driftY,
      0.04
    );
    camera.lookAt(0, 0.15, 0);
  });

  return null;
}

function ParticleField() {
  const cloudRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const values = new Float32Array(280 * 3);

    for (let index = 0; index < 280; index += 1) {
      const stride = index * 3;
      const radius = 2.3 + Math.random() * 3.4;
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 2.8;

      values[stride] = Math.cos(angle) * radius;
      values[stride + 1] = spread;
      values[stride + 2] = Math.sin(angle) * radius * 0.72 - 1.2;
    }

    return values;
  });

  useFrame(({ clock }) => {
    if (!cloudRef.current) {
      return;
    }

    cloudRef.current.rotation.y = clock.elapsedTime * 0.06;
    cloudRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.16) * 0.08;
  });

  return (
    <points ref={cloudRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7cf7ff"
        depthWrite={false}
        opacity={0.72}
        size={0.038}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function PulseCore() {
  const coreRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const loop = clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.y = loop * 0.42;
      coreRef.current.rotation.x = Math.sin(loop * 0.32) * 0.18;
      coreRef.current.position.y = Math.sin(loop * 0.88) * 0.12;
    }

    if (haloRef.current) {
      const haloScale = 1 + Math.sin(loop * 1.7) * 0.08;
      haloRef.current.scale.setScalar(haloScale);
      haloRef.current.rotation.z = loop * 0.46;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = 1.2 + Math.sin(loop * 0.74) * 0.1;
      ringRef.current.rotation.y = loop * 0.28;
    }
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#7c9dff"
          emissive="#1a6cff"
          emissiveIntensity={0.9}
          metalness={0.36}
          roughness={0.18}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[1.2, 0, 0.2]}>
        <torusGeometry args={[1.58, 0.08, 32, 180]} />
        <meshStandardMaterial
          color="#f6c6ff"
          emissive="#b53dff"
          emissiveIntensity={1.15}
          metalness={0.3}
          roughness={0.24}
        />
      </mesh>
      <mesh ref={haloRef} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[2.02, 0.03, 20, 180]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#78fff1"
          opacity={0.68}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#6d8eff"
          opacity={0.08}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}

type FloatingPanelProps = {
  color: string;
  phase: number;
  position: [number, number, number];
  rotation: [number, number, number];
};

function FloatingPanel({ color, phase, position, rotation }: FloatingPanelProps) {
  const panelRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const loop = clock.elapsedTime + phase;

    if (panelRef.current) {
      panelRef.current.position.x = position[0] + Math.sin(loop * 0.9) * 0.24;
      panelRef.current.position.y = position[1] + Math.cos(loop * 1.2) * 0.2;
      panelRef.current.rotation.z = rotation[2] + Math.sin(loop * 0.8) * 0.09;
    }

    if (glowRef.current) {
      glowRef.current.position.copy(panelRef.current?.position ?? new THREE.Vector3());
      glowRef.current.rotation.copy(panelRef.current?.rotation ?? new THREE.Euler());
      const scale = 1.05 + Math.sin(loop * 1.4) * 0.04;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <mesh ref={panelRef} position={position} rotation={rotation}>
        <planeGeometry args={[1.3, 2.2, 1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.42}
          metalness={0.16}
          opacity={0.2}
          roughness={0.12}
          transparent
        />
      </mesh>
      <mesh ref={glowRef} position={position} rotation={rotation} scale={1.08}>
        <planeGeometry args={[1.34, 2.24, 1, 1]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={color}
          opacity={0.12}
          toneMapped={false}
          transparent
        />
      </mesh>
    </>
  );
}

function OrbitDots() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = clock.elapsedTime * 0.36;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.44) * 0.12;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }, (_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        const radius = 2.8 + (index % 2) * 0.18;

        return (
          <mesh
            key={`orbit-dot-${index}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 1.4) * 0.38,
              Math.sin(angle) * radius * 0.65
            ]}
            scale={index % 2 === 0 ? 0.12 : 0.08}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#78fff1" : "#f0b4ff"}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function LoopBands() {
  const bandRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!bandRef.current) {
      return;
    }

    bandRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.34) * 0.2;
    bandRef.current.position.y = -0.4 + Math.sin(clock.elapsedTime * 0.68) * 0.08;
  });

  return (
    <group ref={bandRef}>
      {[-1.1, -0.45, 0.2, 0.82].map((offset, index) => (
        <mesh
          key={`band-${offset}`}
          position={[0, offset, -1.5 - index * 0.12]}
          rotation={[0, 0, -0.22 + index * 0.07]}
        >
          <boxGeometry args={[3.9 - index * 0.3, 0.06, 0.06]} />
          <meshBasicMaterial
            blending={THREE.AdditiveBlending}
            color={index % 2 === 0 ? "#7cf7ff" : "#ff9cf3"}
            opacity={0.55 - index * 0.08}
            toneMapped={false}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function SignalBloomScene() {
  return (
    <>
      <fog attach="fog" args={["#060816", 7.5, 15]} />
      <color args={["#060816"]} attach="background" />
      <ambientLight intensity={0.72} />
      <directionalLight color="#d9e8ff" intensity={1.1} position={[3, 4, 5]} />
      <pointLight color="#66f7ff" intensity={22} position={[-2.8, 1.2, 2.5]} />
      <pointLight color="#db73ff" intensity={18} position={[3.6, -1.2, 3.4]} />
      <spotLight
        angle={0.38}
        color="#ffe0a3"
        intensity={18}
        penumbra={0.8}
        position={[0, 5.4, 1.5]}
      />
      <ParticleField />
      <PulseCore />
      <OrbitDots />
      <LoopBands />
      <FloatingPanel
        color="#74f3ff"
        phase={0.2}
        position={[-2.35, 0.95, -0.5]}
        rotation={[0.28, 0.42, -0.24]}
      />
      <FloatingPanel
        color="#ff9ce9"
        phase={1.1}
        position={[2.15, -0.15, 0.4]}
        rotation={[-0.26, -0.44, 0.26]}
      />
      <FloatingPanel
        color="#98a7ff"
        phase={2.1}
        position={[0.25, 1.95, -1.8]}
        rotation={[-0.42, 0.1, 0.02]}
      />
      <gridHelper args={[18, 18, "#182344", "#0d1431"]} position={[0, -2.6, 0]} />
      <CameraRig />
    </>
  );
}

export function R3FSignalBloomScene() {
  return (
    <Canvas
      camera={{ fov: 42, position: [0, 0.35, 6.4] }}
      dpr={[1, 1.5]}
      gl={{ alpha: false, antialias: true }}
    >
      <SignalBloomScene />
    </Canvas>
  );
}
