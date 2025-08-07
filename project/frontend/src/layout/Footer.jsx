import React from 'react'
import CopyRight from '../ui/CopyRight'
import Logo from '../components/Logo'
import { Youtube , Github,Linkedin} from 'lucide-react'

const Footer = () => {
  return (
  <>
    <div
        id='footer'
        className=' h-[250px] w-screen flex justify-center bg-blue-700 text-white py-7'>
        <div className='h-[200px] w-[85vw] flex justify-evenly py-3'>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300 flex flex-col gap-4'>
            <Logo />
            <p>Evrywhere, anytime. Instantly</p>
          </div>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300'>
            <p className='font-bold text-lg underline my-4'>Usefull links</p>
            <p>terms & conditions</p>
            <p>team members</p>
            <p>Certification of Honor</p>
            <p>About Us</p>
          </div>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300'> </div>
          <div className=' h-[160px] w-[200px] p-2 text-gray-300'>

            <p className='font-bold text-lg underline my-4'>Social medias</p>
            <div className='flex flex-col'>
            <a href="https://www.youtube.com/@splinetool" target="_blank" className='text-green-400 hover:text-accent flex gap-3'> <span className='text-red-300'><Youtube/></span>Youtube</a>
            <a href="https://github.com/Shemab23" target="_blank" className='text-green-400 hover:text-accent flex gap-3'> <span className='text-red-300'><Github/></span>GitHub</a>
            <a href="https://www.linkedin.com/feed/" target="_blank" className='text-green-400 hover:text-accent flex gap-3'> <span className='text-red-300'><Linkedin/></span>LinkedIn</a>
            </div>
          </div>
        </div>
    </div>
    <CopyRight/>
  </>
  )
}

export default Footer
