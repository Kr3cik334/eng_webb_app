"use client";

import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Gallery from "@/components/Gallery";

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

type Props = {
  params: { category: string };
};

const CategoryPage = ({ params }: Props) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: ProductType[] = await getData(params.category);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.category]);

  const [products, setProducts] = React.useState<ProductType[]>([]);
  const categoryName = params.category;
  const getCategoryTitle = (categoryName: string) => {
    let categoryTitle = "";

    if (categoryName === "rosse") {
      categoryTitle = "Pizza Rosse";
    } else if (categoryName === "speciale") {
      categoryTitle = "Pizza Speciale";
    } else if (categoryName === "bianche") {
      categoryTitle = "Pizza Bianche";
    } else {
      categoryTitle = "";
    }

    return categoryTitle;
  };

  const categoryTitle = getCategoryTitle(categoryName);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="bg-[#d9efc944]">
      <motion.h1
        ref={ref}
        className="text-center flex items-center justify-center h-full text-4xl md:pt-32 md:py-0 py-32  uppercase "
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        {categoryTitle}
      </motion.h1>

      <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ duration: 1 }}
            >

      <div className="p-4 lg:px-20 xl:px-40 grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center md:py-32">
        {products.map((item) => (
          
            <Link
              href={`/product/${item.id}`}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="w-full h-full p-5 bg-[#121c18] rounded-md justify-center text-[#fff4e6] hover:scale-105 transition-transform duration-300">
                {/* IMAGE CONTAINER */}
                <div className="flex flex-col items-center">
                  {item.img && (
                    <Image
                      src={item.img}
                      width={200}
                      height={200}
                      alt=""
                    />
                  )}
                </div>
                {/* TEXT CONTAINER */}
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-3xl italic underline text-[#fff4e6]">
                    {item.title}
                  </h1>
                  <p className="text-sm my-8 text-center text-[#fff4e6]">
                    {item.desc}
                  </p>
                  <h2 className="text-xl">{item.price} zł</h2>
                </div>
              </div>
            </Link>
        ))}
      </div>
      </motion.div>
      <Gallery/>
    </div>
  );
};

export default CategoryPage;
