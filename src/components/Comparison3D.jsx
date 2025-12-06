// components/Comparison3D.jsx
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";

const ComparisonModel = ({ isCompared }) => {
  const macRef = useRef();
  const pcRef = useRef();

  useFrame((state) => {
    if (macRef.current && pcRef.current) {
      const time = state.clock.elapsedTime;
      macRef.current.rotation.y = Math.sin(time * 0.5) * 0.1 + 0.5;
      pcRef.current.rotation.y = Math.sin(time * 0.5) * 0.1 - 0.5;

      // Animate positions based on comparison mode
      if (isCompared) {
        macRef.current.position.x = THREE.MathUtils.lerp(
          macRef.current.position.x,
          -2,
          0.05
        );
        pcRef.current.position.x = THREE.MathUtils.lerp(
          pcRef.current.position.x,
          2,
          0.05
        );
      } else {
        macRef.current.position.x = THREE.MathUtils.lerp(
          macRef.current.position.x,
          0,
          0.05
        );
        pcRef.current.position.x = THREE.MathUtils.lerp(
          pcRef.current.position.x,
          0,
          0.05
        );
      }
    }
  });

  return (
    <>
      {/* MacBook Model */}
      <group ref={macRef} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[1, 0.1, 1.4]} />
          <meshStandardMaterial
            color="#1d1d1f"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.2, 0.05, 1.6]} />
          <meshStandardMaterial
            color="#f2f2f2"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.3}
            color="#007AFF"
            anchorX="center"
          >
            MacBook Pro
          </Text>
        </Float>
      </group>

      {/* PC Model */}
      <group ref={pcRef} position={[0, 0, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[1.5, 0.8, 0.6]} />
          <meshStandardMaterial color="#333" metalness={0.3} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1, 0.05, 1.6]} />
          <meshStandardMaterial color="#666" metalness={0.3} roughness={0.6} />
        </mesh>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, 1, 0]}
            fontSize={0.3}
            color="#FF3B30"
            anchorX="center"
          >
            Standard PC
          </Text>
        </Float>
      </group>
    </>
  );
};

const Comparison3D = () => {
  const [isCompared, setIsCompared] = useState(false);

  return (
    <section className="h-screen bg-linear-to-b from-gray-900 to-black">
      <div className="container mx-auto h-full flex flex-col lg:flex-row">
        <div className="lg:w-1/2 h-1/2 lg:h-full p-8 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Beyond Comparison
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            See how MacBook Pro outperforms traditional PCs in every aspect
          </p>

          <button
            onClick={() => setIsCompared(!isCompared)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 w-fit"
          >
            {isCompared ? "Reset View" : "Start Comparison"}
          </button>

          <div className="mt-12 space-y-6">
            <div className="text-white">
              <h3 className="text-2xl font-semibold mb-2">Performance</h3>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>

            <div className="text-white">
              <h3 className="text-2xl font-semibold mb-2">Efficiency</h3>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>

            <div className="text-white">
              <h3 className="text-2xl font-semibold mb-2">Portability</h3>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: "98%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 h-1/2 lg:h-full">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, 5, 5]} intensity={0.5} />

            <ComparisonModel isCompared={isCompared} />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={5}
              maxDistance={15}
              autoRotate={!isCompared}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Comparison3D;
