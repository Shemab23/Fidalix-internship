import React, { useContext, useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import BusinessTable from '../components/BusinessTable.jsx';
import { UserContext } from '../context/UserContext.jsx';

const Order = () => {
  const { card, setCard } = useContext(UserContext);// card undefined??
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (Array.isArray(card)) {
      const newTotal = card.reduce((sum, item) => {
        const unitPrice = item?.storing?.[0]?.price || 0; // for deep objects use condition extration of value; proceed if it is not null || undefined
        const quantity = item.quantity || 1;
        return sum + unitPrice * quantity;
      }, 0);
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [card]);

  return (
    <div
      id='order'
      className='h-[700px] w-full text-black bg-secondary flex justify-between'
    >
      {/* businesses search */}
      <div className='h-[700px] w-[70vw] p-2 bg-green-100 flex items-center flex-col'>
        <h2 className='font-bold underline p-3'>Order</h2>

        <div className='p-6 flex'>
          <input
            type='search'
            placeholder='Browse businesses ....'
            className='h-[35px] w-[20vw] p-2 rounded-md placeholder-gray-500 shadow-xl'
          />
          <button className='h-[35px] flex items-center justify-center w-[4vw] hover:bg-primary'>
            <SearchIcon color='white' strokeWidth={3} />
          </button>
        </div>

        <div className='bg-blue-300 h-[500px] w-[66vw] flex'>
          <BusinessTable />
        </div>
      </div>

      {/* cart */}
      <div className='h-[700px] w-[30vw] min-w-[300px] bg-blue-300 p-4 flex flex-col items-center overflow-y-auto overflow-y-scroll'>
        {Array.isArray(card) && card.length === 0 ? (
          <p className='text-gray-700 text-center'>No product selected yet.</p>
        ) : (
          <>
            <h3 className='font-bold text-lg underline mb-2 sticky top-0 z-10'>My CART</h3>

            {/* Items container - scrollable */}
            <div className='flex-grow w-[13vw]'>
              {card.map((item, index) => {
                const unitPrice = item?.storing?.[0]?.price || 0;

                const handleAmountChange = (e) => {
                  const amount = Math.max(Number(e.target.value), 1);// limite to 1>=  restrict NAN
                  const updated = [...card];
                  updated[index] = { ...updated[index], quantity: amount };
                  setCard(updated);
                };

                const quantity = item.quantity || 1;
                const totalPerItem = quantity * unitPrice;

                return (
                  <div
                    key={index}
                    className='bg-white p-3 shadow-md rounded relative flex flex-col gap-1 mb-2'
                  >
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Measure:</strong> {item.measure}</p>
                    <p><strong>Unit Price:</strong> {unitPrice}RWF</p>
                    <p><strong>Total:</strong> {totalPerItem}RWF</p>

                    <div className='flex items-center gap-2 mt-1'>
                      <label htmlFor={`qty-${index}`} className='text-sm'>
                        Qty:
                      </label>
                      <input
                        id={`qty-${index}`}
                        type='number'
                        min='1'
                        value={quantity}
                        onChange={handleAmountChange}
                        className='w-16 p-1 border rounded'
                      />
                    </div>

                    <button
                      onClick={() => {
                        const updated = card.filter((_, i) => i !== index);
                        setCard(updated);
                      }}
                      className='absolute top-1 right-1 text-red-500 hover:text-red-700 text-sm'
                      title='Remove from cart'
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Sticky total */}
            <div className='sticky bottom-0  relative flex justify-between gap-5'>
              <div className='bg-blue-200 pt-3 font-semibold text-right pr-2 flex justify-center'>
                Total: <span className='text-green-900'>{total} RWF</span>
              </div>
              <button
                className='right-0 bg-accent text-primary font-bold'
                onClick={()=>alert(`You ordered A card worthy: ${total}`,setCard([]))}
              >Order My card</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
