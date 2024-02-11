import React from "react";


const Offer = () => {
  return (
<div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/pizza_table.jpg')] md:h-[70vh] bg-cover bg-center">
  {/* TEXT CONTAINER */}
  <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
    <h1 className="text-white text-5xl font-bold xl:text-6xl">Tylko włoskie składniki</h1>
    <p className="text-white xl:text-xl">
    Odpocznij od codzienności i zanurz się w oceanie smaku z naszą pizzą. Każdy kawałek to połączenie tradycji z nowoczesnością, które rozpali Twoje kubki smakowe. Pozwól sobie na przyjemność 
    </p>
    <a href="/menu" className="text-white py-4 px-8 rounded-md" style={{ backgroundColor: "rgba(18,28,24,1)" }}>Zamów już dziś</a>
  </div>
  {/* TABLE CONTAINER */}
  <div className="flex-1 w-full relative md:h-full">
    <table className="w-full h-full"/>
  </div>
</div>

  );
};

export default Offer;
