import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const MenuPage = async () => {
  const menu: MenuType = await getData();

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-full p-5 md:h-2/5 bg-[#fff4e6] rounded-md justify-center text-[#121c18]"
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
            <h2 className="font-bold text-3xl italic underline text-[#121c18]">
              {category.title}
            </h2>
            <p className="text-sm my-8 text-center text-[#121c18]">
              {category.desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;