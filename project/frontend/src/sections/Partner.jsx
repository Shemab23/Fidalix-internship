import React from 'react'

const Part = ({path='pathdefault',name='namedefault'}) =>{
  return (
    <div className='flex flex-col h-[200px] w-[170px] items-center py-1'>
      <div className='h-[160px] w-[160px] bg-gray-300/80 flex items-center justify-center rounded-full'>
        {path} - {name}
      </div>
      <div className='text-lg font-bold'>{name}</div>
    </div>
  );
}


const Partner = () => {
  const partners = [
    {
      "path":"path1",
      "name":"name 1"
    },
    {
      "path":"path2",
      "name":"name 2"
    },
    {
      "path":"path3",
      "name":"name 3"
    },
    {
      "path":"path4",
      "name":"name 4"
    },
    {
      "path":"path5",
      "name":"name 5"
    },
    {
      "path":"path6",
      "name":"name 6"
    },
  ]
  return (
    <div
        id='partner'
        className=' h-[250px] w-screen flex items-center py-5 flex-col'>
        <div className='font-bold underline text-lg'>Partner</div>
        <div className='h-[200px] w-[90vw] flex justify-evenly'>

          {partners.map(item=>(
            <Part path={item.path} name={item.name}/>
          ))}
        </div>
    </div>
  )
}

export default Partner
