import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {motion as Motion} from 'framer-motion'

const Loginform = ({kind}) =>{
  const navigate = useNavigate();

  const handleclicklogin = () =>{
    if(kind === 'customer'){
      navigate('/Home');
    }else{
      navigate('/business');
    }
  }
  const handleclickRegister = () =>{
    navigate('/register');
  }
  return (
    <div className='h-full w-full p-4 flex flex-col justify-evenly'>
      <div className=' flex justify-center font-bold text-xl underline'>{kind} - Login Form</div>
      <div className='px-[30px] font-semibold flex gap-4 items-center'>
        User Name:
        <input type="text"  id="name" placeholder='Username' className='shadow rounded-md h-[30px] text-md p-4'/>
      </div>
      <div className='px-[30px] font-semibold flex gap-7 items-center'>
        Password:
        <input type="password"  id="name"  placeholder='* * * * * * * * * * *' className=' shadow rounded-md h-[30px] text-md p-4'/>
      </div>
      <div className='flex justify-center gap-8'>
        <button
          className='bg-secondary text-white'
          onClick={()=>handleclicklogin()}
          >Login</button>
        <button
          className='bg-primary text-white'
          onClick={()=>handleclickRegister()}
          >Register</button>
      </div>
      <div className='px-6'>Forgot you password, click <span className=' text-blue-400 underline cursor-pointer'
      onClick={()=>{alert(`sent a on time password at +2507********`)}}
      >Here</span></div>
    </div>
  );
}


const Login = () => {
    const navigate = useNavigate();
    const [kind,setKind] = useState('customer');


    const handleclick= (value) =>{
        setKind(value);
    }
  return (
    <div className='flex flex-col items-center gap-7'>
      <div className='flex w-full justify-end'>
        <button className='bg-primary h-[65px] w-[65px]  right-0 flex justify-center items-center text-white text-lg rounded-xl cursor-pointer'
        onClick={()=>navigate('/admin')}
        >Admin</button>
      </div>
        <div className=' h-[90px] w-[50vw] mt-8 flex flex-col items-center gap-6'>
          <span className='font-bold text-xl underline '>LOGIN PAGE</span>
          <div className='flex w-[60vw] justify-evenly'>
            <Motion.button
              onClick={()=>handleclick('customer')}
              className='bg-transparent border border-black border-b-8 hover:border-primary'
              initial={{translateY: -50 , scale:1}}
              animate={{translateY: 0}}
              whileTap={{
                scale:0.8
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut'
              }}
              >customer</Motion.button>
            <Motion.button
              onClick={()=>handleclick('business')}
              className='bg-transparent border border-black border-b-8 hover:border-primary'
              initial={{translateY: -50 , scale:1}}
              animate={{translateY: 0}}
              whileTap={{
                scale:0.8
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut'
              }}
              >business</Motion.button>
          </div>
        </div>
        {kind === 'customer' ? (
            <div className='bg-green-700 h-[600px] w-[60vw] text-black flex items-center justify-center'>
              <div className='h-[400px] w-[500px] bg-gray-600/70  p-2 border-4 border-white rounded-xl'>
                <Loginform kind={kind}/>
              </div>
            </div>
        ) :(
            <div className='bg-blue-700  h-[600px] w-[60vw] text-black flex items-center justify-center'>
              <div className='h-[400px] w-[500px] bg-gray-600/70  p-2 border-4 border-white rounded-xl grid'>
                <Loginform kind={kind}/>
              </div>
            </div>
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
