// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import ThreeJSPlayground from "./components/ThreeJSPlayground";
import FloatingFeatures from "./components/FloatingFeatures";
import Comparison3D from "./components/Comparison3D";
import ParticleUniverse from "./components/ParticleUniverse";
import ProductCarousel3D from "./components/ProductCarousel3D";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => (
  <>
    <Hero />
    <ProductViewer />
    <ThreeJSPlayground />
    <FloatingFeatures />
    <Comparison3D />
    <ParticleUniverse />
    <ProductCarousel3D />
    <Showcase />
    <Performance />
    <Features />
    <Highlights />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playground" element={<ThreeJSPlayground />} />
            <Route path="/comparison" element={<Comparison3D />} />
            <Route path="/features" element={<FloatingFeatures />} />
            <Route path="/gallery" element={<ProductCarousel3D />} />
            {/* Add other routes as needed */}
            <Route
              path="/store"
              element={
                <div className="min-h-screen flex items-center justify-center text-white text-4xl">
                  Store Page
                </div>
              }
            />
            <Route
              path="/mac"
              element={
                <div className="min-h-screen flex items-center justify-center text-white text-4xl">
                  Mac Page
                </div>
              }
            />
            <Route
              path="/iphone"
              element={
                <div className="min-h-screen flex items-center justify-center text-white text-4xl">
                  iPhone Page
                </div>
              }
            />
            <Route
              path="/watch"
              element={
                <div className="min-h-screen flex items-center justify-center text-white text-4xl">
                  Watch Page
                </div>
              }
            />
            <Route
              path="/vision"
              element={
                <div className="min-h-screen flex items-center justify-center text-white text-4xl">
                  Vision Page
                </div>
              }
            />
            <Route
              path="/airpods"
              element={
                <div className="min-h-screen flex items-center justify-center text-white text-4xl">
                  AirPods Page
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
