"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Offer = () => {
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.5 // Element is considered in view when it's 50% visible
  });

  useEffect(() => {
    if (inView) {
      setIsInView(true);
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [inView, controls]);

  return (
    <div className="h-[70vw] flex flex-col md:flex-row md:justify-between bg-[url('/pizza_table.jpg')] md:h-[70vh] bg-cover bg-center text-center">
      <div ref={inViewRef} className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <motion.h1
          className="text-white text-5xl font-bold xl:text-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          Tylko włoskie składniki
        </motion.h1>
        <motion.p
          className="text-white xl:text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          Odpocznij od codzienności i zanurz się w oceanie smaku z naszą pizzą. Każdy kawałek to połączenie tradycji z nowoczesnością, które rozpali Twoje kubki smakowe. Pozwól sobie na przyjemność
        </motion.p>
        <motion.a
          href="/menu"
          className="text-#[121C18] py-4 px-8 rounded-md bg-[#fff4e6] font-bold"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          Zamów już dziś
        </motion.a>
      </div>
      <div className="flex-1 w-full relative md:h-full hidden md:block">
        <table className="w-full h-full"/>
      </div>
    </div>
  );
};

export default Offer;
