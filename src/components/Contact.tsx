import React from 'react';
import 'tailwindcss/tailwind.css'; // Import the Tailwind CSS file

const ContactPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div className="contact-info bg-[#fff4e6] p-10 rounded-lg">
        <div className=" justify-center items-center md:items-start">
          <h1 className="text-4xl font-bold mb-5 text-center md:text-center">Kontakt</h1>
          <div className="text-center">
            <p className="text-lg font-semibold">Telefon: (+48) 111 222 333</p>
            <p className="text-lg font-semibold">Adres restauracji: Street 123</p>
            <p className="text-lg font-semibold">Godziny otwarcia: Pon - Ndz 12:00 - 22:00</p>
          </div>
        </div>
      </div>
      <div className="map-container">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4963.816725032832!2d2.352485676036863!3d48.85676057370643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1634706814941!5m2!1sen!2sfr"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;