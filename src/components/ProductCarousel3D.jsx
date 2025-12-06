// components/ProductCarousel3D.jsx
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Text,
  Environment,
  MeshReflectorMaterial,
} from "@react-three/drei";

const ProductCarouselItem = ({
  position,
  rotation,
  color,
  title,
  active,
  onClick,
}) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Pulse animation for active item
      if (active) {
        meshRef.current.scale.x =
          1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        meshRef.current.scale.y =
          1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        meshRef.current.scale.z =
          1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 0.6, 1.8]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={active ? color : "#000000"}
            emissiveIntensity={active ? 0.2 : 0}
          />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 0.31, 0.901]}>
          <planeGeometry args={[0.95, 0.5]} />
          <meshStandardMaterial
            color={active ? "#ffffff" : "#333333"}
            emissive={active ? "#ffffff" : "#000000"}
            emissiveIntensity={active ? 0.5 : 0}
          />
        </mesh>

        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
        >
          {title}
        </Text>
      </Float>
    </group>
  );
};

const ProductCarousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      id: 1,
      title: "MacBook Air",
      color: "#8E8E93",
      position: [-4, 0, 0],
      rotation: [0, Math.PI / 8, 0],
    },
    {
      id: 2,
      title: 'MacBook Pro 14"',
      color: "#1d1d1f",
      position: [-2, 0, -1],
      rotation: [0, Math.PI / 16, 0],
    },
    {
      id: 3,
      title: 'MacBook Pro 16"',
      color: "#007AFF",
      position: [0, 0, -2],
      rotation: [0, 0, 0],
    },
    {
      id: 4,
      title: 'iMac 24"',
      color: "#FF3B30",
      position: [2, 0, -1],
      rotation: [0, -Math.PI / 16, 0],
    },
    {
      id: 5,
      title: "Mac Studio",
      color: "#34C759",
      position: [4, 0, 0],
      rotation: [0, -Math.PI / 8, 0],
    },
  ];

  return (
    <section className="h-screen bg-linear-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto h-full flex flex-col">
        <div className="h-1/4 flex items-center justify-center">
          <h2 className="text-5xl font-bold text-white text-center">
            Explore the Family
          </h2>
        </div>

        <div className="h-3/4 relative">
          <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, 5, 5]} intensity={0.5} />

            {products.map((product, index) => (
              <ProductCarouselItem
                key={product.id}
                {...product}
                active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
              <planeGeometry args={[20, 20]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.8}
              />
            </mesh>

            <Environment preset="city" />
          </Canvas>

          <div className="absolute bottom-8 left-0 right-0">
            <div className="flex justify-center space-x-4">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveIndex(index)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {product.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel3D;
