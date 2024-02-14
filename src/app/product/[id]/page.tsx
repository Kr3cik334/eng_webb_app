"use client";

import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const SingleProductPage = ({ params }: { params: { id: string } }) => {
  const [singleProduct, setSingleProduct] = React.useState<ProductType | null>(
    null
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProductType = await getData(params.id);
        setSingleProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-[#121c18] md:flex-row md:gap-8 md:items-center relative">
      {singleProduct && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-1/2 md:h-[70%]"
        >
          {/* IMAGE CONTAINER */}
          {singleProduct.img && (
            <div className="relative w-full h-full">
              <Image
                src={singleProduct.img}
                alt=""
                className="object-contain"
                fill
              />
            </div>
          )}
        </motion.div>
      )}
      {singleProduct && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8"
        >
          {/* TEXT CONTAINER */}
          <h1 className="text-3xl font-bold uppercase relative">
            <span>{singleProduct.title}</span>
            <DeleteButton id={singleProduct.id} />
          </h1>
          <p>{singleProduct.desc}</p>
          <Price product={singleProduct} />
        </motion.div>
      )}
    </div>
  );
};

export default SingleProductPage;
