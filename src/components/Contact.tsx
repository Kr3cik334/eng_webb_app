"use client"

import React, { useEffect } from "react";
import "tailwindcss/tailwind.css"; // Import the Tailwind CSS file
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactPage: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <motion.div
        ref={ref}
        className="contact-info bg-[#fff4e6] p-10 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <div className=" justify-center items-center md:items-start">
          <h1 className="text-4xl font-bold mb-5 text-center md:text-center">
            Kontakt
          </h1>
          <div className="text-center">
            <p className="text-lg font-semibold">Telefon: (+48) 111 222 333</p>
            <p className="text-lg font-semibold">
              Adres restauracji: Street 123
            </p>
            <p className="text-lg font-semibold">
              Godziny otwarcia: Pon - Ndz 12:00 - 22:00
            </p>
          </div>
        </div>
      </motion.div>
      <div className="map-container">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1161.6026240486096!2d18.58295157137757!3d54.388689597848156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd73bd51f21f8b%3A0x50c8a05c9778d809!2sUniwersytet%20WSB%20Merito%20Gda%C5%84sk!5e0!3m2!1spl!2spl!4v1707845538924!5m2!1spl!2spl"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
