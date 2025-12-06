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
import MacPage from "./components/pages/MacPage";
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
            <Route path="/mac" element={<MacPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
