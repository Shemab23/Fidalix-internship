import React from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const naviagete= useNavigate();
  return (
    <div className='flex flex-col justify-center items-center gap-10 p-10'>
        <div className='h-[80px] w-[700px]  flex items-center justify-center font-bold text-xl underline'> REGISTRATION PAGE  </div>
        <div className='h-[600px] w-[600px] bg-gray-300/60  border border-4 border-white rounded-xl px-[150px] py-[80px] flex flex-col gap-5'>
            <div className='flex gap-5 items-center font-semibold'>
                name:
                <input type="text"  id="#"
                placeholder = 'your user name'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                Location:
                <input type="text"  id="#"
                placeholder = 'district-city-country'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                Phone:
                <input type="text"  id="#"
                placeholder = '+250 7********'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                profile:
                <input type="file"  id="#"
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[270px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                password:
                <input type="password"  id="#"
                placeholder = '**********'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                confirm password:
                <input type="password"  id="#"
                placeholder = '**********'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex justify-center'>
                <button className='bg-primary text-white font-bold mt-10 w-[100px] shadow-xl'
                onClick={()=>(naviagete('/'),alert(`registered successfully`))}
                >Register</button>
            </div>
        </div>
        {/* name,location,phone,profile_path,password */}
    </div>
  )
}

export default Register
