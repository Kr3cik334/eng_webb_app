"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Strona główna", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Kontakt", url: "/contact" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  const user = false;

  return (
    <div>
      <Image
        src={open ? "/close1.png" : "/open1.png"}
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-[#121c18] text-[#fff4e6] absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10"
          >
            {links.map((item) => (
              <Link
                href={item.url}
                key={item.id}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link
              href={user ? "/orders" : "login"}
              onClick={() => setOpen(false)}
            >
              {user ? "Orders" : "Zaloguj się"}
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              <CartIcon />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
