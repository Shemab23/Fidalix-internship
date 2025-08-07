import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate= useNavigate();
    /**name, location, phone, password, kind
     * http://localhost:3010/user
     */
    const [name,setName] = useState('');
    const [location,setLocation] = useState('');
    const [phone,setPhone] = useState('');
    const [password1,setPassowrd1] = useState('');
    const [password2,setPassowrd2] = useState('');
    const [kind,setKind] = useState('');
    const [path,setpath] = useState(null);

    const handleSubmit = async () => {
    if (password1 !== password2) {
      alert('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('phone', phone);
    formData.append('password', password1);
    formData.append('kind', kind);
    formData.append('profile_path', path); // must match multer's expected field name

    try {
      const response = await fetch('http://localhost:3010/user', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registered successfully');
            setName(''),
            setLocation(''),
            setPhone(''),
            setPassowrd1(''),
            setPassowrd2(''),
            setKind(''),
            setpath(null)
        navigate('/');
      } else {
        alert(`Registration failed: ${result.Error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-10 p-10'>
        <div className='h-[80px] w-[700px]  flex items-center justify-center font-bold text-xl underline'> REGISTRATION PAGE  </div>
        <div className='h-[600px] w-[600px] bg-gray-300/60  border border-4 border-white rounded-xl px-[150px] py-[80px] flex flex-col gap-5'>
            <div className='flex gap-5 items-center font-semibold'>
                name:
                <input type="text"  value={name}
                placeholder = 'your user name'
                onChange={(e)=>setName(e.target.value)}
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                Location:
                <input type="text"  value={location}
                placeholder = 'district-city-country'
                onChange={(e)=>setLocation(e.target.value)}
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                kind:
                <select
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className='p-4 shadow-lg rounded-lg h-[50px] w-[200px]'
                >
                <option value="" disabled>Select kind</option>
                <option value="customer">customer</option>
                <option value="business">business</option>
                <option value="delivery">delivery</option>
                </select>

            </div>
            <div className='flex gap-5 items-center font-semibold'>
                Phone:
                <input type="text" value={phone}
                placeholder = '+250 7********'
                onChange={(e)=>setPhone(e.target.value)}
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                profile:
                <input type="file"
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[270px]'
                onChange={(e)=>setpath(e.target.files[0])}/>
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                password:
                <input type="password"  value={password1}
                placeholder = '**********'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]'
                onChange={(e)=>setPassowrd1(e.target.value)}/>
            </div>
            <div className='flex gap-5 items-center font-semibold'>
                confirm password:
                <input type="password"  value={password2}
                placeholder = '**********'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]'
                onChange={(e)=>setPassowrd2(e.target.value)} />
            </div>
            <div className='flex justify-center'>
                <button className='bg-primary text-white font-bold mt-10 w-[100px] shadow-xl'
                onClick={()=>handleSubmit()}
                >Register</button>
            </div>
        </div>
        {/* name,location,phone,profile_path,password */}
    </div>
  )
}

export default Register
