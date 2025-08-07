import React, { useState, useEffect } from 'react';

const Part = ({ path = 'pathdefault', name = 'namedefault' }) => {
  return (
    <div className='flex flex-col h-[200px] w-[170px] items-center py-1'>
      <div className='h-[160px] w-[160px] bg-gray-300/80 flex items-center justify-center rounded-full'>
        <img src={path} alt="Logo" />
      </div>
      <div className='text-lg font-bold'>{name}</div>
    </div>
  );
};

const Partner = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const getPartners = async () => {
      try {
        const results = await fetch('http://localhost:3010/partner', {
          method: "GET"
        });
        const data = await results.json();
        setPartners(data);
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    };
    getPartners();
  }, []);

  return (
    <div
      id='partner'
      className='h-[250px] w-screen flex items-center py-5 flex-col'>
      <div className='font-bold underline text-lg'>Partner</div>
      <div className='h-[200px] w-[90vw] flex justify-evenly'>
        {partners.map((item, index) => (
          <Part key={index} path={item.path} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Partner;
