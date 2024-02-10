import React from 'react';
import 'tailwindcss/tailwind.css'; // Import the Tailwind CSS file

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-1/2">
      <h1 className="text-4xl font-bold mb-5 text-center md:text-center">Kontakt</h1>
      <div className="text-center">
      <p className="text-lg font-semibold">Telefon: (+48) 111 222 333</p>
      <p className="text-lg font-semibold">Adres restauracji: Street 123 </p>
      <p className="text-lg font-semibold">Godziny otwarcia: Pon - Ndz 12:00 - 22:00</p>
      </div>
    </div>
        <div className="map-container h-96 w-full md:w-1/2">
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
    </div>
  );
};

export default ContactPage;