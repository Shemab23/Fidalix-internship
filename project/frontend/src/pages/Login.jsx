import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {motion as Motion} from 'framer-motion'
import { UserContext } from '../context/UserContext'

const Loginform = ({kind}) =>{

  const {setInn} = useContext(UserContext);

  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [password,setPassowrd] = useState('');
  const [view,setView] = useState(false);
  const [key,setKey] = useState('');

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
          setInn(result?.user?.id);// save user id in global context
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

  const handle = () =>{
    if(key === 'shema'){
      navigate('/admin');
      setKey('');
      setView(false);
    }else{
      alert(`Wrong access key.`);
      setKey('')
    }
  }
  return (
    <div className='h-full w-full flex flex-col justify-evenly items-center'>
      <div className=' flex justify-center font-bold text-xl underline'>{kind} - Login Form</div>
      <div className='px-[30px] text-lg sm:text-sm font-bold flex gap-4 items-center justify-between lg:w-[35vw]'>
        <span className=' whitespace-nowrap text-lg'>
        User Name:
        </span>
        <input type="text"  value={name} placeholder='Username' className='shadow rounded-md h-[30px] text-md p-4 sm:w-[20vw]'
        onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div className='px-[30px] md:text-sm font-bold flex gap-7 items-center text-lg justify-between lg:w-[35vw]'>
        <span className=' whitespace-nowrap text-lg'>
        Password:
        </span>
        <input type="password"  value={password}  placeholder='* * * * * * * * * * *' className=' shadow rounded-md h-[30px] text-md p-4 sm:w-[20vw]'
        onChange={(e)=>setPassowrd(e.target.value)}
        />
      </div>
      <div className='flex justify-center gap-8'>
        <button
          className='bg-secondary w-[12vw] lg:w-[8vw] h-[5vh] text-white rounded-xl'
          onClick={()=>handleLogin()}
          >Login</button>
        <button
          className='bg-primary w-[12vw] lg:w-[8vw] h-[5vh]  text-white rounded-xl'
          onClick={()=>handleclickRegister()}
          >Register</button>
      </div>
      <div>Forgot you password, click <span className=' text-blue-400 px-4 underline cursor-pointer'
      onClick={()=>{alert(`sent a on time password at +2507********`)}}
      >Here</span></div>
      <span className='absolute bottom-6 font-thin text-sm underline h-[50px] cursor-pointer'
      onClick={()=>setView(true)}
      >Admin Access</span>
      {view && (
      <div className=' absolute h-[30vh] w-[10vw] grid space-y-2'>
        <button className='bg-red-400 font-semibold'
        onClick={()=>setView(false)}
        >x</button>
        <input type="text" value={key} onChange={(e)=>setKey(e.target.value)} placeholder="Enter key" className='px-3' />
        <button className='bg-blue-500 font-semibold'
        onClick={()=>handle()}>login</button>
      </div>
      )}
    </div>
  );
}

const Login = () => {
    // const navigate = useNavigate();
    const [kind,setKind] = useState('customer');
    const handleclick= (value) =>{
        setKind(value);
    }
  return (
    <div className='relative w-screen h-screen flex flex-col items-center'>
        <img src="/images/bgLogo.jpg" alt="background"
        className='z-[-2] absolute inset-0 w-full h-full'/>

      {/* Overlay (opacity balance) */}
      {/* <div className="absolute z-[-1] inset-0 bg-white/20"></div> */}

        <div className='z-0 pt-5 h-[15vh] w-[50vw] flex flex-col items-center gap-6'>
          <span className='font-bold text-lg text-blue-800 underline '>
            LOGIN PAGE
          </span>
          <div className='flex w-[30vw] justify-between'>
            <div className=' relative h-10 grid'>
              <Motion.button
                onClick={()=>handleclick('customer')}
                className='  flex items-center justify-center font-semibold'
                initial={{translateY: -50 , scale:1}}
                animate={{translateY: 0}}
                whileTap={{
                  scale:0.8
                }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut'
                }}
                >
                customer
              </Motion.button>
              {kind==='customer' ? (
                <div className='h-1 bg-blue-800 w-full'/>
              ):(
                <div className='h-1 w-full'/>
              )}
            </div>
            <div className=' relative h-10 grid'>
              <Motion.button
                onClick={()=>handleclick('business')}
                 className=' flex items-center justify-center  font-semibold'
                initial={{translateY: -50 , scale:1}}
                animate={{translateY: 0}}
                whileTap={{
                  scale:0.8
                }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut'
                }}
                >
                business
              </Motion.button>
                            {kind !=='customer' ? (
                <div className='h-1 bg-blue-800 w-full'/>
              ):(
                <div className='h-1 w-full'/>
              )}
            </div>
          </div>
        </div>
        {kind === 'customer' ? (
            <div className='h-[85vh] w-[50vw] text-black flex items-center justify-center'>
              <div className='h-[75vh] sm:w-[50vw] w-[90vw] bg-gray-200/40  p-2 border-4 border-white rounded-xl'>
                <Loginform kind={kind}/>
              </div>
            </div>
        ) :(
            <div className='h-[85vh] w-[50vw] text-black flex items-center justify-center'>
              <div className='h-[75vh] sm:w-[50vw] w-[90vw] bg-gray-200/70  p-2 border-4 border-white rounded-xl'>
                <Loginform kind={kind}/>
              </div>
            </div>
        )}
    </div>
  )
}

export default Login
