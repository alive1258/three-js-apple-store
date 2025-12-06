// // pages/MacPage.jsx
// import { useState } from "react";
// import ProductShowcase from "../ProductShowcase";

// const MacPage = () => {
//   const [color, setColor] = useState("#8B8B8B");

//   return (
//     <div className="min-h-screen bg-linear-to-b from-black to-gray-900 text-white pt-20">
//       <div className="container mx-auto px-4 py-12">
//         <ProductShowcase
//           product="mac"
//           color={color}
//           onColorChange={setColor}
//           price={1999}
//         />

//         {/* Features Section */}
//         <div className="mt-20 grid md:grid-cols-3 gap-8">
//           <div className="bg-gray-800/30 p-8 rounded-2xl backdrop-blur-sm">
//             <div className="text-4xl mb-4">🚀</div>
//             <h3 className="text-xl font-bold mb-3">M3 Chip</h3>
//             <p className="text-gray-400">
//               The most powerful chip ever in a personal computer.
//             </p>
//           </div>

//           <div className="bg-gray-800/30 p-8 rounded-2xl backdrop-blur-sm">
//             <div className="text-4xl mb-4">💻</div>
//             <h3 className="text-xl font-bold mb-3">XDR Display</h3>
//             <p className="text-gray-400">
//               Extreme Dynamic Range with ProMotion.
//             </p>
//           </div>

//           <div className="bg-gray-800/30 p-8 rounded-2xl backdrop-blur-sm">
//             <div className="text-4xl mb-4">🔋</div>
//             <h3 className="text-xl font-bold mb-3">All-Day Battery</h3>
//             <p className="text-gray-400">Up to 22 hours of battery life.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MacPage;

// components/pages/MacPage.jsx
import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Environment,
  Text,
  Box,
  RoundedBox,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// Enhanced Mac 3D Model Component
const MacModel = ({ color = "#8B8B8B", isAnimating }) => {
  const groupRef = useRef();
  const screenRef = useRef();
  const keyboardRef = useRef();

  useFrame((state) => {
    if (isAnimating && groupRef.current) {
      // Smooth floating animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }

    // Screen glow effect
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity =
        0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* MacBook Body */}
      <RoundedBox
        args={[3.2, 0.05, 2.2]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.175, 0]}
      >
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </RoundedBox>

      {/* Screen */}
      <Box
        ref={screenRef}
        args={[2.8, 1.8, 0.01]}
        position={[0, 0.9, 1.05]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#000"
          emissive="#0066FF"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Hinge */}
      <Box args={[0.3, 0.05, 2]} position={[0, 0.4, 1]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.1} />
      </Box>

      {/* Keyboard Deck */}
      <RoundedBox
        ref={keyboardRef}
        args={[3, 0.1, 2]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.05, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Apple Logo */}
      <Box
        args={[0.2, 0.2, 0.01]}
        position={[0, 0.05, -0.8]}
        rotation={[Math.PI, 0, 0]}
      >
        <meshBasicMaterial color="#ffffff" />
      </Box>
    </group>
  );
};

// Animated Particle Background
const ParticleBackground = () => {
  useRef();
  const positions = useRef();
  const particlesRef = useRef();

  useEffect(() => {
    const posArray = new Float32Array(500 * 3);
    for (let i = 0; i < 500 * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    positions.current = new THREE.BufferAttribute(posArray, 3);
    if (particlesRef.current) {
      particlesRef.current.geometry.setAttribute("position", positions.current);
    }
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={new Float32Array(500 * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#0066FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Floating Info Cards with GSAP Animation
const InfoCard = ({ title, description, icon, index }) => {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Main Mac Page Component
const MacPage = () => {
  const [color, setColor] = useState("#8B8B8B");
  const [isAnimating, setIsAnimating] = useState(true);
  const canvasRef = useRef();

  const colors = [
    { name: "Space Gray", value: "#8B8B8B" },
    { name: "Silver", value: "#E8E8E8" },
    { name: "Midnight", value: "#1D1D1F" },
    { name: "Starlight", value: "#F5F5F7" },
  ];

  const specs = [
    {
      title: "M3 Chip",
      description: "The most powerful chip ever in a personal computer.",
      icon: "🚀",
    },
    {
      title: "XDR Display",
      description: "Extreme Dynamic Range with ProMotion.",
      icon: "💻",
    },
    {
      title: "18-Hour Battery",
      description: "All-day power for your workflow.",
      icon: "🔋",
    },
    {
      title: "8-Core CPU",
      description: "Blazing fast performance for professionals.",
      icon: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-purple-900/10" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section with 3D Model */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                MacBook Pro
              </h1>
              <p className="text-gray-400 mt-4 text-lg">
                Supercharged by M3 Pro and M3 Max chips. A new level of
                performance and capability.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-semibold">From $1,999</h3>
              <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95">
                Buy Now
              </button>
            </div>

            {/* Color Selection */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Finish</h4>
              <div className="flex gap-4">
                {colors.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => setColor(col.value)}
                    className="flex flex-col items-center group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        color === col.value
                          ? "border-white scale-110"
                          : "border-gray-600 group-hover:scale-105"
                      }`}
                      style={{ backgroundColor: col.value }}
                    />
                    <span className="text-sm mt-2 text-gray-400">
                      {col.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="h-[500px] rounded-3xl overflow-hidden bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
            <Canvas
              ref={canvasRef}
              shadows
              camera={{ position: [6, 4, 6], fov: 45 }}
            >
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <pointLight
                position={[-10, -10, -10]}
                intensity={0.3}
                color="#0066FF"
              />

              {/* Mac Model */}
              <MacModel color={color} isAnimating={isAnimating} />

              {/* Particle Background */}
              <ParticleBackground />

              {/* Environment & Reflections */}
              <Environment preset="studio" />
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                <planeGeometry args={[10, 10]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={1024}
                  mixBlur={1}
                  mixStrength={50}
                  depthScale={1}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#202020"
                  metalness={0.8}
                  roughness={1}
                />
              </mesh>

              {/* Controls */}
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                autoRotate={isAnimating}
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minDistance={4}
                maxDistance={10}
              />
            </Canvas>

            <div className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {isAnimating ? "❚❚ Pause" : "▶ Play"}
                  </button>
                  <span className="text-sm text-gray-400">
                    Drag to rotate • Scroll to zoom
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Breakthrough Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specs.map((spec, index) => (
              <InfoCard key={spec.title} {...spec} index={index} />
            ))}
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800/50 mb-20">
          <h2 className="text-3xl font-bold mb-8">Performance Benchmarks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "CPU Performance",
                value: "↑ 40%",
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "GPU Performance",
                value: "↑ 50%",
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Battery Life",
                value: "22 hrs",
                color: "from-purple-500 to-pink-500",
              },
            ].map((benchmark) => (
              <div
                key={benchmark.label}
                className="text-center p-6 bg-gray-800/30 rounded-2xl"
              >
                <div
                  className={`text-5xl font-bold bg-linear-to-r ${benchmark.color} bg-clip-text text-transparent mb-2`}
                >
                  {benchmark.value}
                </div>
                <div className="text-gray-400">{benchmark.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Specs Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-800/50">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="p-4 text-left">Specification</th>
                <th className="p-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Chip", "Apple M3 Pro or M3 Max"],
                ["Memory", "Up to 128GB unified memory"],
                ["Storage", "Up to 8TB SSD"],
                ["Display", "Liquid Retina XDR display"],
                ["Battery", "Up to 22 hours"],
                ["Ports", "Three Thunderbolt 4 ports, HDMI, SDXC"],
              ].map(([spec, detail]) => (
                <tr
                  key={spec}
                  className="border-t border-gray-800/50 hover:bg-gray-800/20"
                >
                  <td className="p-4 text-gray-400">{spec}</td>
                  <td className="p-4 font-medium">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MacPage;
