import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const AbstractShape = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  // Throttle mouse-follow using lerp — runs each frame but is very cheap now
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Slow, lightweight rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }

    // Smooth mouse follow — capped movement range
    if (groupRef.current) {
      const targetX = state.pointer.x * 1.5;
      const targetY = state.pointer.y * 1.5;

      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, targetX, 0.04
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y, targetY, 0.04
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, -state.pointer.y * 0.3, 0.04
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, state.pointer.x * 0.3, 0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Float with reduced speed & intensity */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        {/* Outer wireframe — reduced segments from 64→32 */}
        <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.8}>
          <MeshDistortMaterial
            color="#6C63FF"
            attach="material"
            distort={0.3}       // was 0.4 — lighter distortion
            speed={1.2}         // was 2 — slower = cheaper
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Sphere>

        {/* Inner solid sphere — segments from 32→20 */}
        <Sphere args={[1, 20, 20]} scale={1.2}>
          <MeshDistortMaterial
            color="#00D4FF"
            attach="material"
            distort={0.35}      // was 0.6 — much lighter
            speed={1.5}         // was 3 — much lighter
            roughness={0}
            metalness={1}
            opacity={0.5}
            transparent={true}
          />
        </Sphere>
      </Float>
    </group>
  );
};

export default function Hero3D() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}          // cap pixel ratio — was uncapped (could be 2-3x on retina)
        frameloop="always"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#00D4FF" />

        {/* Stars: count 3000→1000, depth 50→30 */}
        <Stars radius={100} depth={30} count={1000} factor={4} saturation={0} fade speed={0.8} />

        <group position={[2.5, 0, 0]}>
          <AbstractShape />
        </group>
      </Canvas>
    </div>
  );
}
