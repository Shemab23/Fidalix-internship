import React from "react";
import CopyRight from "../ui/CopyRight";
import Logo from "../components/Logo";
import { Youtube, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between gap-8">

        {/* Logo & tagline */}
        <div className="flex flex-col gap-4 flex-1 min-w-[180px]">
          <Logo />
          <p className="text-gray-300 text-sm">Everywhere, anytime. Instantly</p>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
          <p className="font-bold text-lg underline mb-2">Useful Links</p>
          <a href="#terms" className="text-gray-300 hover:text-accent transition">Terms & Conditions</a>
          <a href="#team" className="text-gray-300 hover:text-accent transition">Team Members</a>
          <a href="#cert" className="text-gray-300 hover:text-accent transition">Certification of Honor</a>
          <a href="#about" className="text-gray-300 hover:text-accent transition">About Us</a>
        </div>

        {/* Empty / Placeholder Column */}
        <div className="flex-1 min-w-[180px]"></div>

        {/* Social Media */}
        <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
          <p className="font-bold text-lg underline mb-2">Social Media</p>
          <a href="https://www.youtube.com/@splinetool" target="_blank" className="flex items-center gap-2 text-green-400 hover:text-accent transition">
            <Youtube className="text-red-300" /> YouTube
          </a>
          <a href="https://github.com/Shemab23" target="_blank" className="flex items-center gap-2 text-green-400 hover:text-accent transition">
            <Github className="text-red-300" /> GitHub
          </a>
          <a href="https://www.linkedin.com/feed/" target="_blank" className="flex items-center gap-2 text-green-400 hover:text-accent transition">
            <Linkedin className="text-red-300" /> LinkedIn
          </a>
        </div>
      </div>

      <CopyRight />
    </footer>
  );
};

export default Footer;
