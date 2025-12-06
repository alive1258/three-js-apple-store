// components/ThreeJSPlayground.jsx
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, Torus, Plane } from "@react-three/drei";

const ThreeJSPlayground = () => {
  const [geometry, setGeometry] = useState("box");
  const [color, setColor] = useState("#ff6b6b");
  const [light, setLight] = useState("white");
  const [rotate, setRotate] = useState(true);

  const renderGeometry = () => {
    const props = {
      args:
        geometry === "box"
          ? [1, 1, 1]
          : geometry === "sphere"
          ? [0.8, 32, 32]
          : geometry === "torus"
          ? [0.8, 0.3, 16, 100]
          : [2, 2],
      rotation: rotate ? [Math.PI / 4, Math.PI / 4, 0] : [0, 0, 0],
    };

    switch (geometry) {
      case "box":
        return (
          <Box {...props}>
            <meshStandardMaterial color={color} />
          </Box>
        );
      case "sphere":
        return (
          <Sphere {...props}>
            <meshStandardMaterial color={color} />
          </Sphere>
        );
      case "torus":
        return (
          <Torus {...props}>
            <meshStandardMaterial color={color} />
          </Torus>
        );
      case "plane":
        return (
          <Plane {...props}>
            <meshStandardMaterial color={color} side={2} />
          </Plane>
        );
      default:
        return (
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial color={color} />
          </Box>
        );
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">3D Playground</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Interactive Three.js sandbox. Play with shapes, colors, and
            lighting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Controls</h3>

              {/* Geometry Selector */}
              <div className="mb-6">
                <label className="block mb-2">Shape</label>
                <div className="grid grid-cols-2 gap-2">
                  {["box", "sphere", "torus", "plane"].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setGeometry(shape)}
                      className={`py-3 rounded-lg transition-all ${
                        geometry === shape
                          ? "bg-blue-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {shape.charAt(0).toUpperCase() + shape.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div className="mb-6">
                <label className="block mb-2">Color</label>
                <div className="flex gap-2">
                  {["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"].map(
                    (c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className="w-10 h-10 rounded-full border-2 border-gray-600"
                        style={{ backgroundColor: c }}
                      />
                    )
                  )}
                </div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-12 mt-3 rounded-lg cursor-pointer"
                />
              </div>

              {/* Light Color */}
              <div className="mb-6">
                <label className="block mb-2">Light Color</label>
                <div className="flex gap-2">
                  {["white", "#ffd166", "#a8dadc", "#ffafcc"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setLight(c)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        light === c ? "border-white" : "border-gray-600"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span>Auto Rotate</span>
                <button
                  onClick={() => setRotate(!rotate)}
                  className={`w-12 h-6 rounded-full transition-all ${
                    rotate ? "bg-green-500" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                      rotate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-bold mb-3">Quick Tips</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Drag to rotate camera</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Right-click drag to pan</li>
                <li>• Try different light colors</li>
              </ul>
            </div>
          </div>

          {/* Canvas */}
          <div className="md:col-span-2 bg-gray-900 rounded-2xl overflow-hidden h-[500px]">
            <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
              {/* Lighting */}
              <ambientLight intensity={0.3} color={light} />
              <pointLight position={[5, 5, 5]} intensity={0.8} color={light} />
              <directionalLight
                position={[-5, 5, -5]}
                intensity={0.5}
                color={light}
                castShadow
              />

              {/* Geometry */}
              {renderGeometry()}

              {/* Floor */}
              <Plane
                args={[10, 10]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1.5, 0]}
              >
                <meshStandardMaterial color="#333" />
              </Plane>

              {/* Grid Helper */}
              <gridHelper args={[10, 10, "#444", "#222"]} />

              {/* Controls */}
              <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>

            <div className="p-4 bg-gray-800/50 text-center">
              <div className="flex justify-center gap-6">
                <div>
                  <div className="text-gray-400 text-sm">Shape</div>
                  <div className="font-bold">{geometry}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Light</div>
                  <div className="font-bold">
                    {light === "white" ? "White" : "Colored"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Rotation</div>
                  <div className="font-bold">{rotate ? "On" : "Off"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">
            Built with React Three Fiber • Drag to interact with the 3D scene
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThreeJSPlayground;
