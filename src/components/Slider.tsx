"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

const data = [
  {
    id: 1,
    title: 'Najlepsza pizza do podzialu się z przyjaciółmi',
    image: '/slider/slide3.jpg',
  },
  {
    id: 2,
    title: 'Nasza pizza zawsze jest pyszna, swieża i chrupiąca',
    image: '/slider/slide2.jpg',
  },
  {
    id: 3,
    title: 'Pizza wypiekana według klasycznej włoskiej receptury',
    image: '/slider/slide1.jpg',
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, [controls]);

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-9rem)] lg:flex-row">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 font-bold text-center text-[#121c18] bg-[#fff4e6]">
        <motion.h1
          className="text-5xl md:text-6xl xl:text-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {data[currentSlide].title}
        </motion.h1>
        <a
          href="/menu"
          className="bg-[#121c18] py-4 px-8 rounded-md text-white"
        >
          Zamów teraz
        </a>
      </div>
      <div className="w-full flex-1 relative">
        {data.map((slide, index) => (
          <motion.div
            key={slide.id}
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
        ))}
      </div>
    </div>
  );
};

export default Slider;
