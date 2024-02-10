import React from "react";

const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between">
      <a href="/" className="font-bold text-xl" target="_blank" rel="noopener noreferrer">PizzaArt</a>
      <div className="flex items-center">
        <a href="https://www.facebook.com/" className="logo-link" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.png" alt="Facebook Logo" className="logo-image" style={{ width: "50px", height: "50px" }} />
        </a>
        <a href="https://www.instagram.com/" className="logo-link" target="_blank" rel="noopener noreferrer" style={{ marginLeft: "20px" }}>
          <img src="/instagram.png" alt="Instagram Logo" className="logo-image" style={{ width: "50px", height: "50px" }} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
