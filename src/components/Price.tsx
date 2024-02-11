"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])

  useEffect(() => {
    if (product.price) {
      setTotal(quantity * product.price)
  }
  }, [product.price]);

  const handleCart = ()=>{
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      quantity: quantity,
    })
    toast.success("Produkt dodany do koszyka!")
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{total}ZŁ</h2>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-[#121c18]">
          <span>Ilość</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-[#121c18] text-white p-3 ring-1 ring-[#121c18]"
          onClick={handleCart}
        >
          Do koszyka
        </button>
      </div>
    </div>
  );
};

export default Price;
