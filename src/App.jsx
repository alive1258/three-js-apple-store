import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";
import FloatingFeatures from "./components/FloatingFeatures";
import Comparison3D from "./components/Comparison3D";
import ParticleUniverse from "./components/ParticleUniverse";
import ProductCarousel3D from "./components/ProductCarousel3D";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
      <FloatingFeatures />
      <Comparison3D />
      <ParticleUniverse />
      <ProductCarousel3D />
      <Showcase />
      <Performance />
      <Features />

      <Highlights />
      <Footer />
    </main>
  );
};

export default App;
