import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category:string)=>{
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`,{
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");
    
  }

  return res.json()
}

type Props = {
  params:{category:string}
}

const CategoryPage = async ({params}:Props) => {

  const products:ProductType[] = await getData(params.category)
  return (
    <div className="flex flex-wrap text-red-150">
      {products.map((item) => (
        <Link className="w-full h-[60vh] border-r-2 border-b-2 border-[#121c18] sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-[#d9efc944]" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain"/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">{item.price}ZŁ</h2>
            <button className="hidden group-hover:block uppercase bg-[#121c18] text-white p-2 rounded-md">Dodaj do koszyka</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
