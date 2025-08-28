import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { text: "Blogs", id: "blog" },
    { text: "Press Order", id: "order" },
    { text: "Our Community", id: "partner" },
    { text: "Contact Us", id: "contact" },
  ];

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setClicked(id);
      setMobileOpen(false); // close mobile menu after click
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[60px] px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map((item) => (
            <Motion.div
              key={item.id}
              onClick={() => scrollTo(item.id)}
              whileHover={{ scale: 1.1 }}
              className={`cursor-pointer font-medium transition-all ${
                clicked === item.id ? "text-primary" : "text-black"
              }`}
            >
              {item.text}
            </Motion.div>
          ))}
        </div>

        {/* User Section */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow transition-all"
          >
            Logout
          </button>
          <img
            src={user?.profile_path || "https://via.placeholder.com/50"}
            alt="profile"
            className="h-[50px] w-[50px] object-cover rounded-lg border-2 border-gray-200"
          />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2 text-black"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-md shadow-md"
          >
            <div className="flex flex-col items-center py-4 gap-4">
              {links.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`font-medium text-lg transition-all ${
                    clicked === item.id ? "text-primary" : "text-black"
                  }`}
                >
                  {item.text}
                </button>
              ))}

              <button
                onClick={() => navigate("/")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow transition-all mt-2"
              >
                Logout
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
