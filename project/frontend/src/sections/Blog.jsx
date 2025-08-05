import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import Blogs from '../components/blog.jsx';

const totalBlogs = 6;

const Blog = () => {
  const [id, setId] = useState(0);
  const handleNext = () => {
    setId(prevId => (prevId === totalBlogs - 1 ? 0 : prevId + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="blog" className='grid w-screen h-[360px] bg-orange-300'>

        <AnimatePresence mode="wait">
          <Motion.div
            key={id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Blogs pk={id} />
          </Motion.div>
        </AnimatePresence>


      <div className='flex items-center justify-center gap-2 mt-4'>
        {Array.from({ length: totalBlogs }).map((_, index) => (
          <div
            key={index}
            onClick={() => setId(index)}
            className={`h-[43px] w-[43px] rounded-full transition-all duration-300 cursor-pointer ${
              id === index ? 'bg-blue-300' : 'bg-green-500 scale-50'

            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
