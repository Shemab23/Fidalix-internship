import React, { Children } from 'react'
import '../index.css'
import {motion as Motion} from 'framer-motion'

const Logo = ({children}) => {
  return (
    <Motion.div
  className={`text-lg font-bold text-green-900  h-[40px] w-[70px] bg-blue-300 flex items-center justify-center  rounded-xl cursor-pointer  ring-4`}
  style={{ fontFamily: 'Bungee'}}
  initial = {{
    scale: 0.7,
    translateX: -20
  }}
  animate = {{
    scale: 1,
    translateX: 0
  }}
  whileTap={{
    scale: 0.9
  }}
  transition={{
    duration: 0.6
  }}

>
  {children == null ? 'TUMA' : children}
</Motion.div>

  )
}

export default Logo
