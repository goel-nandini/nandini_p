import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const AbstractShape = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    // Intrinsic rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
    
    // Mouse follow movement
    if (groupRef.current) {
      // Calculate target position based on mouse (pointer is normalized -1 to 1)
      // We multiply by a factor to restrict how far it can move
      const targetX = state.pointer.x * 2.5; 
      const targetY = state.pointer.y * 2.5;
      
      // Smoothly interpolate current position towards target position
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      
      // Add slight tilting rotation corresponding to mouse movement
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.5, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.5, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
          <MeshDistortMaterial
            color="#6C63FF"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Sphere>
        <Sphere args={[1, 32, 32]} scale={1.2}>
          <MeshDistortMaterial
            color="#00D4FF"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0}
            metalness={1}
            opacity={0.6}
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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00D4FF" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        {/* We move it to the right on desktop, and hide entirely on small screens via CSS/positioning externally. 
            Inside the canvas we just offset it to the right. */}
        <group position={[2.5, 0, 0]}>
          <AbstractShape />
        </group>
      </Canvas>
    </div>
  );
}
