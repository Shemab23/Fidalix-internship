import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {motion as Motion} from 'framer-motion'
/**
 * {
    "msg": "Logged in successfully",
    "user": {
        "id": 7,
        "kind": "delivery",
        "name": "Bavakure",
        "location": "Gasabo-Kigali-Rwanda",
        "phone": "+250795644455",
        "profile_path": "/images/7-Bavakure.jpg",
        "password": "bavakure",
        "createdAt": "2025-08-07T15:36:33.000Z",
        "updatedAt": "2025-08-07T15:36:33.000Z"
    }
}

name password
 */
const Loginform = ({kind}) =>{
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [password,setPassowrd] = useState('');

    const handleclicklogin = () =>{
    if(kind === 'customer'){
      navigate('/Home');
    }else{
      navigate('/business');
    }
  }
    const handleLogin = async () =>{
      if(!name||!password){
        alert(`all fleids are required`);
        return;
      }

      try {
        const response = await fetch('http://localhost:3010/login',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, password })
        });
        const result = await response.json();

        if (result.msg === "Logged in successfully") {
          localStorage.setItem("user", JSON.stringify(result.user));
          alert(`logged in successfully`);
          handleclicklogin();
        }else{
          alert(`Error: ${result.msg}`);
        }
      } catch (err) {
        alert(`Login failed, Error: ${err.message}`);
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
        <input type="text"  value={name} placeholder='Username' className='shadow rounded-md h-[30px] text-md p-4'
        onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div className='px-[30px] font-semibold flex gap-7 items-center'>
        Password:
        <input type="password"  value={password}  placeholder='* * * * * * * * * * *' className=' shadow rounded-md h-[30px] text-md p-4'
        onChange={(e)=>setPassowrd(e.target.value)}
        />
      </div>
      <div className='flex justify-center gap-8'>
        <button
          className='bg-secondary text-white'
          onClick={()=>handleLogin()}
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
