import React from 'react'
import CopyRight from '../ui/CopyRight'

const Footer = () => {
  return (
  <>
    <div
        id='footer'
        className=' h-[250px] w-screen flex justify-center bg-blue-700 text-white py-7'>
        <div className='h-[200px] w-[85vw] flex justify-evenly py-3'>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300 '>Log & blog</div>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300'>Usefull links</div>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300'> </div>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300'>Social medias</div>
        </div>
    </div>
    <CopyRight/>
  </>
  )
}

export default Footer
