import React, { useState, useEffect } from "react";

const Part = ({ path = "pathdefault", name = "namedefault" }) => {
  return (
    <div className="flex item-center flex-col py-1 w-[140px] sm:w-[160px]">
      <div>
        <img src={path} alt={name} className=" border-green-400 border-2 shadow-xl lg:h-[120px] lg:w-[120px] h-[90px] w-[90px] rounded-lg object-cover" />
      </div>
      <div className="text-sm sm:text-lg font-bold text-center mt-2">{name}</div>
    </div>
  );
};

const Partner = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const getPartners = async () => {
      try {
        const results = await fetch("http://localhost:3010/partner");
        const data = await results.json();
        setPartners(data);
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };
    getPartners();
  }, []);

  return (
    <section
      id="partner"
      className="w-full bg-gradient-to-r from-purple-100 via-pink-200 to-blue-200 flex flex-col items-center"
    >
      <h2 className="font-bold underline text-lg sm:text-xl mb-4">Partners</h2>

      <div className="w-[90%] flex flex-wrap justify-center gap-4 sm:gap-6">
        {partners.map((item, index) => (
          <Part key={index} path={item.path} name={item.name} />
        ))}
      </div>
    </section>
  );
};

export default Partner;
