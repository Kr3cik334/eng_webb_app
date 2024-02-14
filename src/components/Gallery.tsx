"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const data = [
  {
    id: 1,
    image: '/gallery/1.jpg',
  },
  {
    id: 2,
    image: '/gallery/2.jpg',
  },
  {
    id: 3,
    image: '/gallery/3.jpg',
  },
  {
    id: 4,
    image: '/gallery/4.jpg',
  },
];

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // trigger animation only once
    threshold: 0.5, // trigger animation when 50% of the image is in view
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1 });
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col md:flex-row md:justify-between overflow-hidden md:h-[64vh] h-60">
      <div className="w-full relative h-full">
        {data.map((slide, index) => (
          <div key={slide.id} className="absolute inset-0" ref={index === 0 ? ref : null}>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={slide.image}
                alt=""
                layout="fill"
                className="object-cover"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
