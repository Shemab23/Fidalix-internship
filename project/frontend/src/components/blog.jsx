import React from 'react'
import blogs from '../lib/BlogLib.js'

const blog = ({pk}) => {
    const Id = parseInt(pk) % 6;
    const one = blogs[Id];
  return (
    <div className='flex justify-evenly items-center  h-[280px] gap-5'>
        <div className='flex flex-col gap-1 w-[600px] max-h-[500px]'>
            <div className='font-bold underline text-lg'>{one.title}</div>
            <div>{one.description}</div>
        </div>
        <div className='max-w-[300px] h-[400px]'>
        <img src={one.image} alt="blog image" className="w-full h-full object-contain rounded-md" />
        </div>

    </div>
  )
}

export default blog
