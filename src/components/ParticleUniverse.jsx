/* eslint-disable react-hooks/purity */
// components/ParticleUniverse.jsx
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const ParticleField = ({ count = 2000 }) => {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#007AFF"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const ParticleUniverse = () => {
  return (
    <section className="h-screen relative bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ParticleField count={5000} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#007AFF" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#5856D6"
          />
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-600">
            Infinite Possibilities
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Step into a universe of creativity and innovation
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {["Creativity", "Productivity", "Innovation", "Performance"].map(
              (item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticleUniverse;
