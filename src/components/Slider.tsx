"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const data = [
  {
    id: 1,
    title: 'Always fresh & always crispy & always hot',
    image: '/slide1.png',
  },
  {
    id: 2,
    title: 'We deliver your order wherever you are in NY',
    image: '/slide2.png',
  },
  {
    id: 3,
    title: 'The best pizza to share with your family',
    image: '/slide3.jpg',
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-9rem)] lg:flex-row">
      <div className="flex-1 flex items-center justify-center flex-col gap-8 font-bold text-center text-[#121c18] bg-[#fff4e6]">
        <h1 className="text-5xl md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <a
          href="/menu"
          className="bg-[#121c18] py-4 px-8 rounded-md text-white"
          //#121c18
        >
          Zamów teraz
        </a>
      </div>
      <div className="w-full flex-1 relative">
        {data.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt=""
              layout="fill"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

// const featuredProducts:ProductType[] = await getData()