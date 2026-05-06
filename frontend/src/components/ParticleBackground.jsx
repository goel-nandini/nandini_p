import React, { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Stable ID — must NOT be inside the component or it regenerates every render
const PARTICLE_ID = "tsparticles-bg";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return <div className="absolute inset-0 bg-transparent -z-10" />;

  return (
    <Particles
      id={PARTICLE_ID}
      className="absolute inset-0 z-0 pointer-events-none"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 30,           // was 60 — halved to reduce GPU usage
        particles: {
          color: { value: "#00ffcc" },
          links: {
            color: "#00ffcc",
            distance: 120,
            enable: true,
            opacity: 0.15,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 1,           // was 1.5 — slightly slower
            straight: false,
          },
          number: {
            density: { enable: true, area: 1000 },
            value: 25,          // was 40 — fewer particles
          },
          opacity: { value: 0.25 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: false,    // was true — disabling prevents 2x particle doubling on retina
      }}
    />
  );
};

export default ParticleBackground;
