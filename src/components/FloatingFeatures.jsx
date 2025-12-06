// components/FloatingFeatures.jsx
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  Float,
  Environment,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";

const FloatingIcons = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const features = [
    {
      position: [-4, 2, 0],
      icon: "🚀",
      title: "M3 Chip",
      description: "Next-gen performance",
    },
    {
      position: [0, 2, 0],
      icon: "⚡",
      title: "24GB RAM",
      description: "Ultra-fast memory",
    },
    {
      position: [4, 2, 0],
      icon: "💻",
      title: "18h Battery",
      description: "All-day power",
    },
    {
      position: [-2, -2, 0],
      icon: "🖥️",
      title: "Liquid Retina",
      description: "Stunning display",
    },
    {
      position: [2, -2, 0],
      icon: "🔋",
      title: "Fast Charge",
      description: "50% in 30min",
    },
  ];

  return (
    <group ref={groupRef}>
      {features.map((feature, idx) => (
        <Float key={idx} speed={2} rotationIntensity={1} floatIntensity={2}>
          <group position={feature.position}>
            <mesh>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial
                color="#007AFF"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <Text
              position={[0, 0, 0.35]}
              fontSize={0.4}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {feature.icon}
            </Text>

            <Text
              position={[0, -0.8, 0]}
              fontSize={0.2}
              color="#8E8E93"
              anchorX="center"
              anchorY="middle"
            >
              {feature.title}
            </Text>
            <Text
              position={[0, -1.1, 0]}
              fontSize={0.15}
              color="#8E8E93"
              anchorX="center"
              anchorY="middle"
            >
              {feature.description}
            </Text>
          </group>
        </Float>
      ))}
    </group>
  );
};

const FloatingFeatures = () => {
  return (
    <section className="h-screen bg-linear-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />

          <FloatingIcons />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
            <planeGeometry args={[20, 20]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.8}
            />
          </mesh>

          <Environment preset="studio" />
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-white mb-6">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience cutting-edge technology with our most advanced features
            yet
          </p>
        </div>
      </div>
    </section>
  );
};

export default FloatingFeatures;
