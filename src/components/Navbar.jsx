// components/Navbar.jsx
import { Link } from "react-router-dom";
import { ShoppingBag, Apple } from "lucide-react";

const Navbar = () => {
  const products = [
    { name: "Mac", path: "/mac", icon: "💻" },
    { name: "iPhone", path: "/iphone", icon: "📱" },
    { name: "Watch", path: "/watch", icon: "⌚" },
    { name: "Vision", path: "/vision", icon: "👓" },
    { name: "AirPods", path: "/airpods", icon: "🎧" },
    { name: "Store", path: "/store", icon: "🛒" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-lg z-50 border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Apple className="w-8 h-8" />
            <span className="text-xl font-semibold">Apple</span>
          </Link>

          {/* Product Links */}
          <div className="hidden md:flex items-center gap-8">
            {products.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Cart */}
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
