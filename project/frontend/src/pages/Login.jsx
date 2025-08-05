import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [kind,setKind] = useState('customer');

    const handleclick= (value) =>{
        setKind(value);
    }
  return (
    <div className='flex flex-col items-center gap-7 relative'>
        <button className='absolute bg-primary h-[65px] w-[65px]  right-0 flex justify-center items-center text-white text-lg rounded-xl cursor-pointer'
        onClick={()=>navigate('/admin')}
        >Admin</button>
        <div className='bg-red-300 h-[70px] w-[50vw] mt-8'>
            {/* <div>business</div> */}
            <button onClick={()=>handleclick('customer')}>customer</button>
            <button onClick={()=>handleclick('business')}>business</button>
        </div>
        {kind === 'customer' ? (
            <div className='bg-green-300 h-[700px] w-[80vw] text-white'>customer</div>
        ) :(
            <div className='bg-gray-300 h-[700px] w-[80vw] text-black'>business</div>
        )}
    </div>
  )
}

export default Login

/**
 *navigate(`/product/${productId}`);


<Route path="/product/:id" element={<ProductDetails />} />


import { useParams } from 'react-router-dom';
const ProductDetails = () => {
  const { id } = useParams();
  return <div>Product ID: {id}</div>;
};
 */
