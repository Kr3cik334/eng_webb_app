"use client";

import { MenuType } from "@/types/types";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const MenuPage = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });
  const [menu, setMenu] = React.useState<MenuType>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getData();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="bg-[#d9efc944]">
      <motion.h1
        ref={ref}
        className="text-center flex items-center justify-center h-full text-4xl md:pt-32 md:py-0 py-32 uppercase"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        Wybierz rodzaj pizzy
      </motion.h1>

      <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 1 }}
            >
      <div className="p-4 lg:px-20 xl:px-40 grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center md:py-32">
  {menu.map((category) => (
    <Link
      key={category.id}
      href={`/menu/${category.slug}`}
      className="w-full h-full p-5 bg-[#121c18] rounded-md justify-center text-[#fff4e6] hover:scale-105 transition-transform duration-300"
    >
      <div className="flex flex-col items-center">
        <h1>
          <Image
            width={200}
            height={200}
            src={category.img as string}
            alt="cat_img"
          />
        </h1>
        <h2 className="font-bold text-3xl italic underline text-[#fff4e6]">
          {category.title}
        </h2>
        <p className="text-sm my-8 text-center text-[#fff4e6]">
          {category.desc}
        </p>
      </div>
    </Link>
  ))}
</div>

      </motion.div>
    </div>
  );
};

export default MenuPage;
