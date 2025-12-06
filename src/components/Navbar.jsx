// import { navLinks } from "../constants";

// const NavBar = () => {
//   return (
//     <header>
//       <nav>
//         <img src="/logo.svg" alt="Apple logo" />

//         <ul>
//           {navLinks.map(({ label }) => (
//             <li key={label}>
//               <a href={label}>{label}</a>
//             </li>
//           ))}
//         </ul>

//         <div className="flex-center gap-3">
//           <button>
//             <img src="/search.svg" alt="Search" />
//           </button>
//           <button>
//             <img src="/cart.svg" alt="Cart" />
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };
// export default NavBar;

// components/NavBar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Store", path: "/store" },
    { label: "Mac", path: "/mac" },
    { label: "iPhone", path: "/iphone" },
    { label: "Watch", path: "/watch" },
    { label: "Vision", path: "/vision" },
    { label: "AirPods", path: "/airpods" },
    { label: "3D Playground", path: "/playground" },
    { label: "Comparison", path: "/comparison" },
    { label: "Features", path: "/features" },
    { label: "Gallery", path: "/gallery" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Apple logo" className="h-8 w-8" />
          <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            3D Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navLinks.map(({ label, path }) => (
            <li key={label}>
              <Link
                to={path}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium hover:scale-105 transform"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <button className="hidden md:block p-2 hover:bg-gray-800 rounded-full transition-colors">
            <img src="/search.svg" alt="Search" className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button className="hidden md:block p-2 hover:bg-gray-800 rounded-full transition-colors relative">
            <img src="/cart.svg" alt="Cart" className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Theme Toggle */}
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <div className="w-5 h-5 rounded-full bg-linear-to-r from-blue-400 to-purple-600"></div>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800">
          <div className="container mx-auto px-6 py-8">
            <ul className="space-y-6">
              {navLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-blue-400 transition-colors duration-300 text-lg font-medium block py-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <div className="pt-6 border-t border-gray-800 flex items-center gap-4">
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <img src="/search.svg" alt="Search" className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors relative">
                  <img src="/cart.svg" alt="Cart" className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
