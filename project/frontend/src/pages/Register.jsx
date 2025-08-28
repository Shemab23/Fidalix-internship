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
    <div className='relative w-full h-full flex flex-col items-center'>
      <img
        src="https://static.vecteezy.com/system/resources/previews/004/979/193/original/hexagon-abstract-green-neon-background-free-vector.jpg"
        alt="Background"
        className=" absolute z-[-2] w-full h-full object-cover"
      />

      {/* Overlay (opacity balance) */}
      <div className="absolute z-[-1]  inset-0 bg-black/30"></div>

        <div className='h-[10vh] w-[700px]  flex items-center justify-center font-bold text-xl underline text-white'> REGISTRATION PAGE  </div>
        <div className='h-[90vh] sm:w-[50vw] w-[90vw] bg-gray-600/90  p-2 border-4 border-white rounded-xl flex flex-col justify-evenly'>
            <div className='flex gap-5 items-center justify-evenly  w-[40vw] font-semibold'>
              <span>
                name:
              </span>
                <input type="text"  value={name}
                placeholder = 'your user name'
                onChange={(e)=>setName(e.target.value)}
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
           <div className='flex gap-5 items-center justify-evenly  w-[40vw] font-semibold'>
              <span>
                Location:
              </span>
                <input type="text"  value={location}
                placeholder = 'district-city-country'
                onChange={(e)=>setLocation(e.target.value)}
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center justify-evenly  w-[40vw] font-semibold'>
              <span>
                Kind:
              </span>
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
            <div className='flex gap-5 items-center justify-evenly  w-[40vw] font-semibold'>
              <span>
                Phone:
              </span>
                <input type="text" value={phone}
                placeholder = '+250 7********'
                onChange={(e)=>setPhone(e.target.value)}
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]' />
            </div>
            <div className='flex gap-5 items-center justify-evenly  w-[45vw] font-semibold'>
              <span>
                Profile:
              </span>
                <input type="file"
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[270px]'
                onChange={(e)=>setpath(e.target.files[0])}/>
            </div>
            <div className='flex gap-5 items-center justify-evenly  w-[40vw] font-semibold'>
              <span>
                Password:
              </span>
                <input type="password"  value={password1}
                placeholder = '**********'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]'
                onChange={(e)=>setPassowrd1(e.target.value)}/>
            </div>
            <div className='flex gap-5 items-center justify-evenly  w-[40vw] font-semibold'>
              <span>
                Confirm Password:
              </span>
                <input type="password"  value={password2}
                placeholder = '**********'
                className='p-4 shadow-lg rounded-lg py-3 h-[40px] w-[200px]'
                onChange={(e)=>setPassowrd2(e.target.value)} />
            </div>
            <div className='flex justify-center'>
                <button className='bg-primary text-white font-bold p-2 rounded-xl shadow-xl'
                onClick={()=>handleSubmit()}
                >Register</button>
            </div>
            <p className='flex justify-center'>Already have an Account <span className='pl-2 underline text-blue-400 cursor-pointer'
            onClick={()=>navigate('/')}>Click Here</span></p>
        </div>
        {/* name,location,phone,profile_path,password */}
    </div>
  )
}

export default Register
