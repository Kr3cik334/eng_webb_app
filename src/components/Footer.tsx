import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-16 md:h-24 p-4 lg:px-20 xl:px-40 flex items-center justify-between bg-white">
      <a className="logo-link" style={{ marginLeft: "10px" }}>
        <Image
          src="/logo.png"
          alt="PizzaArt Logo"
          className="logo-image"
          layout="fixed"
          width={100}
          height={100}
        />
      </a>
      <div className="flex items-center">
        <a
          href="https://www.facebook.com/"
          className="logo-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/facebook.png"
            alt="Facebook Logo"
            className="logo-image"
            layout="fixed"
            width={50}
            height={50}
          />
        </a>
        <a
          href="https://www.instagram.com/"
          className="logo-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "20px" }}
        >
          <Image
            src="/instagram1.png"
            alt="Instagram Logo"
            className="logo-image"
            layout="fixed"
            width={50}
            height={50}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
