import React, { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Blogs from "../components/blog.jsx";

const totalBlogs = 6;

const Blog = () => {
  const [id, setId] = useState(0);

  const handleNext = () => {
    setId(prevId => (prevId === totalBlogs - 1 ? 0 : prevId + 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="blog"
      className="relative w-full max-w-screen-xl mx-auto h-[360px] sm:h-[400px] md:h-[400px] lg:h-[450px] px-4 sm:px-6 md:px-10 rounded-2xl overflow-hidden md:flex items-center
                 bg-gradient-to-r from-yellow-400 via-orange-300 to-red-400"
    >
      <AnimatePresence mode="wait">
        <Motion.div
          key={id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Blogs pk={id} />
        </Motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3">
        {Array.from({ length: totalBlogs }).map((_, index) => (
          <div
            key={index}
            onClick={() => setId(index)}
            className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full cursor-pointer transition-all duration-300
                        ${id === index ? "bg-white scale-125" : "bg-white/50 hover:scale-110"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Blog;
