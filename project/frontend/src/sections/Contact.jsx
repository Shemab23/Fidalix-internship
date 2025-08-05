import React from 'react'

const Contact = () => {
  return (
    <div
        id='contact'
        className=' h-[565px] w-screen bg-indigo-300 flex flex-col items-center py-6 gap-6'>
        <div className='font-bold text-xl underline '>Contact Us </div>
        <div className='h-[400px] w-[600px] bg-black/30 text-black text-lg font-bold flex flex-col p-12 border border-4 rounded-lg'>
          <div className='h-[70px] p-4 flex gap-3 '>
            names :
            <input type="text" className='rounded-lg shadow-lg w-[300px] text-sm p-3' placeholder='Your name'/>
          </div>
          <div className='h-[70px] p-4 flex gap-6 '>
            Email :
            <input type="text" className='rounded-lg shadow-lg w-[300px] text-sm p-3' placeholder='your@email'/>
          </div>
          <div className='h-[240px] p-4 flex gap-[5px] '>
            Message :
            {/* <input type="text-area" className='rounded-lg shadow-lg font-semibold'/> */}
            <textarea name="message" id="messagearea" className='rounded-lg shadow-lg font-semibold w-[300px] text-sm p-2' placeholder='Type your maessage here'/>
          </div>
        </div>
        <button>Submit</button>
    </div>
  )
}

export default Contact
