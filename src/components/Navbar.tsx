import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
<div className="h-14 text-[#121c18] p-4 flex items-center justify-between border-b-2 border-b-[#121c18] uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1 whitespace-nowrap">
  <Link href="/">Strona główna</Link>
  <Link href="/menu">Menu</Link>
  <Link href="/contact">Kontakt</Link>
</div>
      {/* LOGO */}
      <a href="/" className="logo-link" style={{ marginLeft: "10px" }}>
      <Image
        src="/logo.png"
        alt="PizzaArt Logo"
        className="logo-image w-24 h-24 md:w-40 md:h-40"
        layout="fixed"
        width={200}
        height={200}
        objectFit="contain"
      />
</a>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;