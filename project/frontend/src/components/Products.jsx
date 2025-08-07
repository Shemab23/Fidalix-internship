import React, { useEffect, useState, useContext } from 'react';
import { SearchIcon } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { UserContext } from '../context/UserContext';

const Products = ({ items: Id }) => {
  const index = parseInt(Id);
  const [page, setPage] = useState(0);
  const [product, setProduct] = useState([]);
  const { setCard } = useContext(UserContext);

  const perPage = 3;
  const totalPages = Math.ceil(product.length / perPage);

  const handleClick = (id) => {
    const selectedItem = product.find(item => item.id === id);
    if (selectedItem) {
      setCard(prev => [...prev, selectedItem]);
    }
  };

  const visible = product.slice(
    page * perPage,
    (page + 1) * perPage
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3010/user/business/owner/${index}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    };

    fetchProducts();
    const interv = setInterval(fetchProducts, 5000);
    return () => clearInterval(interv);
  }, [index]);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="h-[35px] w-[20vw] flex items-center">
        <input
          id="searchbar"
          type="text"
          placeholder="Search product...."
          className="w-[15vw] p-2 rounded-lg"
        />
        <button className="h-[37px] w-[60px] flex items-center justify-center">
          <SearchIcon className="h-[30px] w-[30px]" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-12">
        {visible.length !== 0 ? (
          visible.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow-xl cursor-pointer hover:scale-105 transition"
            >
              <div className="w-[160px] h-[160px] bg-red-200/30 mb-2" />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">Measure: {item.measure}</p>
              {item.storing && item.storing?.length > 0 && (
                <div className="mt-2">
                  <p>
                    Price: <span>{item.storing?.[0]?.price}</span> RWF
                  </p>
                  <Motion.button
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm h-[40px] w-[60px] flex items-center justify-center bg-accent text-primary font-bold mt-2"
                    onClick={() => handleClick(item.id)}
                  >
                    order
                  </Motion.button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>no info fetched</p>
        )}
      </div>

      <div className="flex justify-evenly w-full relative mt-4">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
          className="absolute left-5 disabled:bg-gray-400/70 disabled:text-white"
        >
          prev
        </button>
        <p>
          tab - {page + 1} of - {totalPages}
        </p>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages - 1}
          className="absolute right-5 disabled:bg-gray-400/70 disabled:text-white"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Products;
