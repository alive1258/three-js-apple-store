// components/ProductShowcase.jsx

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const ProductShowcase = ({ product, color, onColorChange, price }) => {
  const colors = {
    mac: ["#8B8B8B", "#E8E8E8", "#1D1D1F", "#C82506"],
    iphone: ["#F5F5F7", "#1D1D1F", "#FFD700", "#E73C3C"],
    watch: ["#1D1D1F", "#E8E8E8", "#FFD700", "#0066CC"],
    vision: ["#E8E8E8", "#1D1D1F", "#0066CC", "#8B0000"],
    airpods: ["#FFFFFF", "#1D1D1F", "#FFD700", "#0066CC"],
  };

  const getModel = () => {
    const geometry = {
      mac: <boxGeometry args={[3, 0.3, 2.5]} />,
      iphone: <boxGeometry args={[0.8, 0.15, 1.7]} />,
      watch: <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />,
      vision: <torusGeometry args={[1, 0.3, 16, 100]} />,
      airpods: (
        <group>
          <boxGeometry args={[0.3, 0.4, 0.8]} />
          <boxGeometry args={[0.3, 0.4, 0.8]} position={[0.5, 0, 0]} />
        </group>
      ),
    };

    return (
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh castShadow receiveShadow>
          {geometry[product] || geometry.mac}
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1}
          />
          {product === "watch" && (
            <mesh position={[0, 0, 0.21]}>
              <cylinderGeometry args={[0.45, 0.45, 0.05, 32]} />
              <meshBasicMaterial color="#000" />
            </mesh>
          )}
        </mesh>
      </Float>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* 3D Viewer */}
        <div className="h-[500px] bg-linear-to-br from-gray-900 to-black rounded-3xl overflow-hidden">
          <Canvas shadows camera={{ position: [5, 3, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {getModel()}

            <Environment preset="studio" />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-bold bg-linear-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              {product === "mac" && "MacBook Pro"}
              {product === "iphone" && "iPhone 15 Pro"}
              {product === "watch" && "Apple Watch Ultra"}
              {product === "vision" && "Apple Vision Pro"}
              {product === "airpods" && "AirPods Max"}
            </h1>
            <p className="text-gray-400 mt-2">The ultimate experience</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">${price}</h3>
            <p className="text-gray-300 leading-relaxed">
              {product === "mac" && "Supercharged by M3 Pro and M3 Max chips."}
              {product === "iphone" && "Titanium. So strong. So light. So Pro."}
              {product === "watch" && "The ultimate sports watch."}
              {product === "vision" &&
                "An immersive way to experience entertainment."}
              {product === "airpods" &&
                "A perfect balance of exhilarating high-fidelity audio."}
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Colors</h4>
            <div className="flex gap-3">
              {colors[product]?.map((col) => (
                <button
                  key={col}
                  onClick={() => onColorChange(col)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${
                    color === col ? "border-white scale-110" : "border-gray-700"
                  }`}
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all hover:scale-105">
            Add to Bag
          </button>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800">
            <div>
              <p className="text-gray-400">Chip</p>
              <p className="font-semibold">
                {product === "mac" && "M3 Pro"}
                {product === "iphone" && "A17 Pro"}
                {product === "watch" && "S9 SiP"}
                {product === "vision" && "M2 + R1"}
                {product === "airpods" && "H2 Chip"}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Battery</p>
              <p className="font-semibold">
                {product === "mac" && "18 hours"}
                {product === "iphone" && "24 hours"}
                {product === "watch" && "36 hours"}
                {product === "vision" && "2 hours"}
                {product === "airpods" && "20 hours"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
