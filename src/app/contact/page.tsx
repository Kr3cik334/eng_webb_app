import React from 'react';
import 'tailwindcss/tailwind.css'; // Import the Tailwind CSS file

const ContactPage: React.FC = () => {
  return (
<div>
  <div className="flex flex-col md:flex-row justify-center items-center h-full mx-10 md:py-10 pb-5">
    <div className="h-96 w-full md:w-1/2 flex items-center justify-center">
      <div id='middle' className="text-center">
        <h1 className="text-4xl font-bold mb-5">Kontakt</h1>
        <div>
          <p className="text-lg font-semibold">Telefon: (+48) 111 222 333</p>
          <p className="text-lg font-semibold">Adres restauracji: Street 123</p>
          <p className="text-lg font-semibold">Godziny otwarcia: Pon - Ndz 12:00 - 22:00</p>
      </div>
      </div>
    </div>
        <div className="map-container h-96 w-full md:w-1/2">
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
      <div className="h-[70vw] flex flex-col md:flex-row md:justify-between bg-[url('/pizza_table.jpg')] md:h-[70vh] bg-cover bg-center text-center">
      </div>
    </div>
  );
};

export default ContactPage;