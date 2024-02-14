"use client";

import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [showProducts, setShowProducts] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setShowProducts(true); // Trigger animation on component mount
    setShowPayment(true);
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Nie opłacone!",
            userEmail: session.user.email,
          }),
        });
        const data =await res.json()
        router.push(`/pay/${data.id}`)
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-[#121c18] lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <AnimatePresence>
        {showProducts && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
            {/* SINGLE ITEM */}
            {products.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between mb-4">
                {item.img && (
                  <Image src={item.img} alt="" width={100} height={100} />
                )}
                <div className="">
                  <h1 className="uppercase text-xl font-bold">
                    {item.title} x{item.quantity}
                  </h1>
                  <span>{item.optionTitle}</span>
                </div>
                <h2 className="font-bold">{item.price} zł</h2>
                <motion.span
                  className="cursor-pointer"
                  onClick={() => removeFromCart(item)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                >
                  X
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* PAYMENT CONTAINER */}
      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-1/2 p-4 bg-[#d9efc944] flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
            <div className="flex justify-between">
              <span className=""> Produkty ({totalItems})</span>
              <span className="">{totalPrice} zł</span>
            </div>
            <div className="flex justify-between">
              <span className="">Koszt dostawy</span>
              <span className="text-green-500">Za Darmo !</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <span className="">ŁĄCZNIE</span>
              <span className="font-bold">{totalPrice} zł</span>
            </div>
            <button
              className="bg-[#121c18] text-white p-3 rounded-md w-1/2 self-end"
              onClick={handleCheckout}
            >
              Płatność
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;

