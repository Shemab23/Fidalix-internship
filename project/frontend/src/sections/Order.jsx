import React, { useContext, useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import BusinessTable from "../components/BusinessTable.jsx";
import { UserContext } from "../context/UserContext.jsx";

const Order = () => {
  const { card, setCard } = useContext(UserContext);
  const [total, setTotal] = useState(0);
  // const [key, setKey] = useState('');


  useEffect(() => {
    if (Array.isArray(card)) {
      const newTotal = card.reduce((sum, item) => {
        const unitPrice = item?.storing?.[0]?.price || 0;
        const quantity = item.quantity || 1;
        return sum + unitPrice * quantity;
      }, 0);
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [card]);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gradient-to-b from-green-100 via-blue-100 to-purple-100 gap-4 p-4">

      {/* Businesses Search/Table */}
      <div className="flex-1 bg-green-50 p-4 rounded-xl shadow-md flex flex-col">
        <h2 className="font-bold underline mb-3 text-center text-lg">Order</h2>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="search"
            placeholder="Browse businesses..."
            className="flex-1 p-2 rounded-md border border-gray-300 shadow-sm w-full sm:w-auto"
          />
        </div>

        <div className="flex-1 overflow-x-auto rounded-xl shadow-inner bg-green-100">
          <BusinessTable />
        </div>
      </div>

      {/* Cart */}
      <div className="flex-1 lg:w-[350px] bg-gradient-to-b from-blue-200 to-blue-300 p-4 rounded-xl shadow-md flex flex-col mt-4 lg:mt-0">
        {Array.isArray(card) && card.length === 0 ? (
          <p className="text-gray-700 text-center mt-4">No product selected yet.</p>
        ) : (
          <>
            <h3 className="font-bold text-lg underline mb-2 sticky top-0 bg-blue-300 z-10 p-2 rounded-t text-center">
              My CART
            </h3>

            <div className="flex-grow overflow-y-auto flex flex-col gap-3 py-2">
              {card.map((item, index) => {
                const unitPrice = item?.storing?.[0]?.price || 0;
                const quantity = item.quantity || 1;
                const totalPerItem = unitPrice * quantity;

                const handleAmountChange = (e) => {
                  const amount = Math.max(Number(e.target.value), 1);
                  const updated = [...card];
                  updated[index] = { ...updated[index], quantity: amount };
                  setCard(updated);
                };

                return (
                  <div
                    key={index}
                    className="bg-white p-3 rounded shadow relative flex flex-col gap-1"
                  >
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Measure:</strong> {item.measure}</p>
                    <p><strong>Unit Price:</strong> {unitPrice} RWF</p>
                    <p><strong>Total:</strong> {totalPerItem} RWF</p>

                    <div className="flex items-center gap-2 mt-1">
                      <label htmlFor={`qty-${index}`} className="text-sm">Qty:</label>
                      <input
                        id={`qty-${index}`}
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleAmountChange}
                        className="w-16 p-1 border rounded"
                      />
                    </div>

                    <button
                      onClick={() => setCard(card.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-sm"
                      title="Remove from cart"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Total & Order Button */}
            <div className="mt-2 flex flex-col sm:flex-row justify-between items-center gap-2 sticky bottom-0 bg-blue-300 p-2 rounded-b">
              <div className="font-semibold text-lg text-center sm:text-left">
                Total: <span className="text-green-900">{total} RWF</span>
              </div>
              <button
                className="bg-green-600 text-white font-bold px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
                onClick={() => {
                  alert(`You ordered a cart worth: ${total} RWF`);
                  setCard([]);
                }}
              >
                Order My Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
